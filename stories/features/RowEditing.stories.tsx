import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Editing Examples',
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
    editable: true,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
    editable: true,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
    editable: true,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
    editable: true,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
    editable: true,
  },
];

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingEnabledAsync: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow = async (row) => {
    setIsSaving(true);
    await setTimeout(() => {
      tableData[+row.index] = row.values;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={handleSaveRow}
    />
  );
};
