'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc, Timestamp, limit, startAfter, endBefore, limitToLast, getCountFromServer } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Calculation } from '@/lib/types';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ITEMS_PER_PAGE = 10;

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [firstVisible, setFirstVisible] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const fetchHistory = async (direction: 'next' | 'prev' | 'initial' = 'initial') => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const historyCollection = collection(db, 'history');
      const baseQuery = query(
        historyCollection,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      // Get total count for pagination
      if (direction === 'initial') {
        const countSnapshot = await getCountFromServer(query(historyCollection, where('userId', '==', user.uid)));
        setTotalItems(countSnapshot.data().count);
      }
      
      let q;
      if (direction === 'next' && lastVisible) {
        q = query(baseQuery, startAfter(lastVisible), limit(ITEMS_PER_PAGE));
      } else if (direction === 'prev' && firstVisible) {
        q = query(baseQuery, endBefore(firstVisible), limitToLast(ITEMS_PER_PAGE));
      } else {
        q = query(baseQuery, limit(ITEMS_PER_PAGE));
      }

      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Calculation[];
      
      if (!querySnapshot.empty) {
        setHistory(historyData);
        setFirstVisible(querySnapshot.docs[0]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } else {
        // Handle case where we go back and there are no more pages
        if (direction === 'next') setCurrentPage(prev => prev - 1);
        if (direction === 'prev') setCurrentPage(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load calculation history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'history', id));
      setHistory(history.filter(item => item.id !== id));
      setTotalItems(prev => prev -1);
    } catch (err) {
      console.error(err);
      setError('Failed to delete history item.');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      fetchHistory('next');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      fetchHistory('prev');
    }
  };


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-8 text-primary">
          Calculation History
        </h1>
        <div className="space-y-4 max-w-4xl mx-auto">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">Please <Link href="/login" className="text-primary underline">log in</Link> to view your calculation history.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold">An Error Occurred</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Button onClick={() => fetchHistory()} className="mt-6">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-8 text-primary">
        Calculation History
      </h1>
      {history.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground text-lg">You have no saved calculations yet.</p>
          <Button asChild className="mt-4">
            <Link href="/">Explore Calculators</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-w-4xl mx-auto">
            {history.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.calculatorTitle}</CardTitle>
                      <CardDescription>
                        {item.createdAt && format(new Date((item.createdAt as unknown as Timestamp).seconds * 1000), 'PPP p')}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/calculator/${item.calculatorSlug}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this calculation from your history.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id!)} className='bg-destructive hover:bg-destructive/90'>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2 border-b pb-1">Inputs</h4>
                      <ul className="space-y-1">
                        {Object.entries(item.inputs).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key}:</span>
                            <span>{String(value)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 border-b pb-1">Results</h4>
                      <ul className="space-y-1">
                        {Object.entries(item.results).map(([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key}:</span>
                            <span className="font-medium">{typeof value === 'number' ? value.toFixed(2) : String(value)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
