"use client"
import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationComponent({totalPages,page,setPage}) {
  return (
      <Pagination count={totalPages} page={page} onChange={(e,val)=>setPage(val)} />
  );
}
