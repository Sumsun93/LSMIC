/**
 * Package import
 */
import React, { useMemo } from 'react';
import { Column, useTable, useGlobalFilter, useSortBy } from 'react-table';
import { Table } from '@oclock/crumble';

/**
 * Local import
 */

/**
 * Component
 */
const UsersTable = ({ data }: any) => {
    const tableData = useMemo(() => data, [data]);

    const columns: Column[] = useMemo(() => [
            { Header: 'Status', accessor: '', Cell: ({ row }) => <div>{row.values.isAvailable ? 'dispo' : 'pas dispo'}</div> },
            { Header: 'Prénom Nom', accessor: 'username' },
            { Header: 'Numéro de téléphone', accessor: 'phone' },
            { Header: 'Compte bancaire', accessor: 'bank' },
        ]
        , []);

    const tableInstance = useTable(
        {
            columns,
            data: tableData,
        },
        useGlobalFilter,
        useSortBy
    );

    return (
        <Table tableInstance={tableInstance} />
    )
};

export default UsersTable;
