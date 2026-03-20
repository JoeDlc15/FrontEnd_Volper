import React from 'react';

const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${className}`}
            {...props}
        />
    );
};

export const ProductDetailSkeleton = () => {
    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
                {/* Breadcrumbs Skeleton */}
                <div className="flex gap-2 mb-10">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex flex-col lg:flex-row gap-16 mb-24">
                    {/* Gallery Skeleton */}
                    <div className="flex-1 space-y-4">
                        <Skeleton className="aspect-square w-full rounded-3xl" />
                        <div className="flex gap-4">
                            <Skeleton className="h-20 w-20 rounded-xl" />
                            <Skeleton className="h-20 w-20 rounded-xl" />
                            <Skeleton className="h-20 w-20 rounded-xl" />
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-3/4" />
                        </div>
                        <div className="flex gap-4">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-24 w-full" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-32 rounded-xl" />
                            <Skeleton className="h-12 w-48 rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Table Skeleton */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-10 w-40 rounded-2xl" />
                    </div>
                    <div className="rounded-3xl border border-slate-100 dark:border-slate-900 overflow-hidden">
                        <div className="h-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-900" />
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-900 last:border-0">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-8 w-24 rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
        </div>
    );
};

export const CatalogSkeleton = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <header className="mb-12 space-y-4">
                    <Skeleton className="h-10 w-64 md:w-96" />
                    <Skeleton className="h-4 w-full md:w-1/2" />
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Skeleton */}
                    <div className="hidden md:block w-64 space-y-6">
                        <Skeleton className="h-6 w-32" />
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} className="h-10 w-full rounded-xl" />
                            ))}
                        </div>
                    </div>

                    <main className="flex-1 space-y-8">
                        <div className="flex gap-4">
                            <Skeleton className="h-12 flex-1 rounded-xl" />
                            <Skeleton className="h-12 w-32 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
