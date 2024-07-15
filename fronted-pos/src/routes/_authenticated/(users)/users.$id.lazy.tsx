import { Suspense, lazy } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

const LazyUserEdit = lazy(() => import('@/components/Users/UserEdit'));

export const Route = createLazyFileRoute('/_authenticated/(users)/users/$id')({
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyUserEdit />
    </Suspense>
  ),
});
