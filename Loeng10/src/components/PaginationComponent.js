import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = (props) => {
    const pageNumbers = [];
    console.log(props);

    for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
        <Pagination.First onClick={() => props.onPageChange(1)} disabled={props.currentPage === 1} />
        <Pagination.Prev onClick={() => props.onPageChange(props.currentPage - 1 )} disabled={props.currentPage === 1}/>
        {
            pageNumbers.map((pageNumber) => {
                return (
                <Pagination.Item 
                    key={pageNumber}
                    active={pageNumber === props.currentPage}
                    onClick={()=>props.onPageChange(pageNumber)}
                    >
                    {pageNumber}
                </Pagination.Item>
                );
            })
        }
        <Pagination.Next onClick={() => props.onPageChange(props.currentPage + 1 )} disabled={props.currentPage === props.totalPages}/>
        <Pagination.Last onClick={() => props.onPageChange(props.totalPages)} disabled={props.currentPage === props.totalPages}/>
    </Pagination>
    );
    
};

export default PaginationComponent;