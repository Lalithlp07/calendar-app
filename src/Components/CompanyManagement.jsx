import React, { useState } from 'react';
import { Drawer, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import DataTable from '../Components/DataTable';
import { companies as initialCompanies } from '../Utils/companies'; // Import the JSON data

const CompanyManagement = () => {
  // Set the initial company list from JSON
  const [companyList, setCompanyList] = useState(initialCompanies);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  // Function to close the drawer
  const onDrawerClose = () => {
    setOpenDrawer(false);
    reset(); // Clear the form
    setEditMode(false); // Reset to add mode
  };

  // Open the drawer for adding a new company
  const openDrawerHandler = () => {
    setEditMode(false); // Ensure it's in add mode
    setOpenDrawer(true);
  };

  // Add or update a company
  const handleAddOrUpdateCompany = (data) => {
    if (editMode) {
      // Update the existing company
      setCompanyList((prevList) =>
        [data, ...prevList.filter((company) => company.id !== editingCompanyId)]
      );
      message.success('Company updated successfully!');
    } else {
      // Add a new company
      setCompanyList([{ ...data, id: Date.now() }, ...companyList]);
      message.success('Company added successfully!');
    }
    setOpenDrawer(false);
    reset(); // Clear the form
    setEditMode(false); // Reset to add mode
  };

  // Edit a company
  const handleEditCompany = (company) => {
    setEditMode(true);
    setEditingCompanyId(company.id);
    setOpenDrawer(true);

    // Populate the form with existing data
    setValue('name', company.name);
    setValue('location', company.location);
    setValue('linkedin', company.linkedin);
    setValue('emails', company.emails);
    setValue('phoneNumbers', company.phoneNumbers);
    setValue('comments', company.comments);
    setValue('communicationPeriodicity', company.communicationPeriodicity);
  };

  // Delete a company
  const handleDeleteCompany = (id) => {
    setCompanyList(companyList.filter((company) => company.id !== id));
    message.success('Company deleted successfully!');
  };

  const headers = [
    { Header: 'Company Name', accessor: 'name' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'LinkedIn', accessor: 'linkedin' },
    { Header: 'Emails', accessor: 'emails' },
    { Header: 'Phone Numbers', accessor: 'phoneNumbers' },
    { Header: 'Comments', accessor: 'comments' },
    // Add more headers as needed
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
        <div className="flex justify-end">
            <Button
                type="primary"
                onClick={openDrawerHandler}
                className='font-semibold'
            >
                Add New Company
            </Button>
      </div>
      <div className='w-full'>
      {companyList.length > 0 ? (
        <DataTable
          columns={headers}
          data={companyList}
          onEdit={handleEditCompany}
          onDelete={handleDeleteCompany}
        />
      ) : (
        <p className="text-center text-gray-500">No records found.</p>
      )}
      </div>

      {/* Drawer Component */}
      <Drawer
        onClose={onDrawerClose}
        open={openDrawer}
        title={editMode ? 'Edit Company' : 'Add New Company'}
        width={400}
      >
        {/* Form Content */}
       
        <form onSubmit={handleSubmit(handleAddOrUpdateCompany)} className="space-y-4 relative h-full">
         <div className='h-[90%] overflow-y-auto thin-scrollbar pr-3 pl-1 space-y-3'>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Company Name <span className='text-red-700'>*</span>
                </label>
                <input
                id="name"
                {...register('name', { required: 'Company Name is required' })}
                placeholder="Company Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">
                Location  <span className='text-red-700'>*</span>
                </label>
                <input
                id="location"
                {...register('location', { required: 'Location is required' })}
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
            </div>

            <div>
                <label htmlFor="linkedin" className="block mb-2 text-sm font-medium text-gray-700">
                LinkedIn Profile  <span className='text-red-700'>*</span>
                </label>
                <input
                id="linkedin"
                {...register('linkedin', { required: 'LinkedIn profile is required' })}
                placeholder="LinkedIn Profile"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.linkedin && <span className="text-red-500 text-sm">{errors.linkedin.message}</span>}
            </div>

            <div>
                <label htmlFor="emails" className="block mb-2 text-sm font-medium text-gray-700">
                Email  <span className='text-red-700'>*</span>
                </label>
                <input
                id="emails"
                {...register('emails', { required: 'Emails are required' })}
                placeholder="Emails"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.emails && <span className="text-red-500 text-sm">{errors.emails.message}</span>}
            </div>

            <div>
                <label htmlFor="phoneNumbers" className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number <span className='text-red-700'>*</span>
                </label>
                <input
                id="phoneNumbers"
                {...register('phoneNumbers', { required: 'Phone Numbers are required' })}
                placeholder="Phone Numbers"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumbers && <span className="text-red-500 text-sm">{errors.phoneNumbers.message}</span>}
            </div>

            <div>
                <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-700">
                Comments
                </label>
                <textarea
                id="comments"
                {...register('comments')}
                placeholder="Comments"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.comments && <span className="text-red-500 text-sm">{errors.comments.message}</span>}
            </div>

            <div>
                <label htmlFor="communicationPeriodicity" className="block mb-2 text-sm font-medium text-gray-700">
                Communication Periodicity (days)
                </label>
                <input
                id="communicationPeriodicity"
                {...register('communicationPeriodicity')}
                placeholder="Communication Periodicity (days)"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.communicationPeriodicity && (
                <span className="text-red-500 text-sm">{errors.communicationPeriodicity.message}</span>
                )}
            </div>
        </div>
            {/* Drawer Footer */}
            <div className="flex gap-4 mt-6 fixed right-[1.6rem] bottom-[0.5rem] bg-white z-[10] h-[3rem] w-fit">
                <Button type="primary" htmlType="submit" className="bg-blue-500 text-white">
                    Save
                </Button>
                <Button onClick={onDrawerClose} className="bg-red-500 text-white">
                Cancel
                </Button>
            </div>
        </form>
      </Drawer>
    </div>
  );
};

export default CompanyManagement;
