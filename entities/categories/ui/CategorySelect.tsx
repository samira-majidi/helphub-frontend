'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories.api';

interface CategorySelectProps {
  value?: number | string;
  onChange: (categoryId: number) => void;
  error?: string;
}

export default function CategorySelect({ value, onChange, error }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: responseData, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 24 * 60 * 60 * 1000, 
  });

  const categoryList = responseData?.data || responseData || [];

  const selectedCategory = categoryList.find((c: any) => c.id === Number(value));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative flex items-center h-full" ref={dropdownRef}>
      
      <div
        onClick={() => !isLoading && !isError && setIsOpen(!isOpen)}
        className={`w-full flex items-center bg-transparent font-sans text-base cursor-pointer focus:outline-none transition-colors h-full ${
          error ? 'text-red-500' : 'text-slate-700'
        }`}
      >
        <span className={`truncate w-full ${!selectedCategory ? 'text-gray-400' : 'text-slate-800'}`}>
          {isLoading 
            ? 'Loading...' 
            : selectedCategory 
              ? selectedCategory.name 
              : 'What do you need help with?'}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-4 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2 max-h-60 overflow-y-auto transform origin-top transition-all">
          {categoryList.map((category: any) => {
            const isSelected = Number(value) === category.id;
            
            return (
              <div
                key={category.id}
                onClick={() => {
                  onChange(category.id);
                  setIsOpen(false);
                }}
                className={`
                  px-5 py-3 cursor-pointer text-sm md:text-base transition-colors duration-200
                  ${isSelected 
                    ? 'bg-[#0A1E3F] text-white font-medium' 
                    : 'text-slate-700 hover:bg-[#0A1E3F] hover:text-white' 
                  }
                `}
              >
                {category.name}
              </div>
            );
          })}
          
          {categoryList.length === 0 && !isLoading && (
            <div className="px-5 py-3 text-gray-400 text-sm">No categories found.</div>
          )}
        </div>
      )}
      
      {error && (
        <span className="text-xs text-red-500 absolute -bottom-6 left-0 whitespace-nowrap">
          {error}
        </span>
      )}
    </div>
  );
}
