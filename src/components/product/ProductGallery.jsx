import React from 'react';

const ProductGallery = ({ images, mainImage, setMainImage, productName }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full lg:w-1/2">
            <div className="flex flex-row md:flex-col gap-3 shrink-0 order-2 md:order-1 overflow-x-auto md:overflow-y-auto max-h-[500px] hide-scrollbar pb-2 md:pb-0">
                {images.map((img) => (
                    <div
                        key={img.id}
                        onClick={() => setMainImage(img.url)}
                        className={`size-20 shrink-0 rounded-xl border-2 ${mainImage === img.url ? 'border-primary' : 'border-slate-200 dark:border-slate-800'} overflow-hidden cursor-pointer hover:border-primary/50 transition-all`}
                    >
                        <img
                            src={img.url}
                            alt={`${productName} thumbnail`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            <div className="grow aspect-square bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden order-1 md:order-2">
                <img
                    src={mainImage}
                    alt={productName}
                    className="w-full h-full object-contain p-4"
                />
            </div>
        </div>
    );
};

export default ProductGallery;
