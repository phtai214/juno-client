import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import "../../style/pages/admin/EmployeeList.scss"

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const employeesPerPage = 5;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/user');
                const filteredEmployees = response.data.filter(user => user.role === 'employee');
                setEmployees(filteredEmployees);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(employee => {
        const searchMatch = employee.name.toLowerCase().includes(search.toLowerCase()) || employee.email.toLowerCase().includes(search.toLowerCase());
        const statusMatch = statusFilter ? employee.status === statusFilter : true;
        const roleMatch = roleFilter ? employee.role === roleFilter : true;

        return searchMatch && statusMatch && roleMatch;
    });

    const pageCount = Math.ceil(filteredEmployees.length / employeesPerPage);
    const offset = currentPage * employeesPerPage;
    const currentEmployees = filteredEmployees.slice(offset, offset + employeesPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRoleFilter(e.target.value);
    };

    // Hiển thị hộp thoại xác nhận xóa
    const confirmDelete = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setDeleteConfirm(true);
    };

    // Xử lý xóa nhân viên
    const handleDeleteEmployee = async () => {
        if (employeeToDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/v1/user/permissions/${employeeToDelete}`);
                setEmployees(employees.filter(employee => employee._id !== employeeToDelete));
                setDeleteConfirm(false);
                setEmployeeToDelete(null);
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <div className="employee-list-container">
            <h2>Danh sách nhân viên</h2>

            <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email"
                value={search}
                onChange={handleSearchChange}
            />

            <div className="filters">
                <select value={statusFilter} onChange={handleStatusChange}>
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <select value={roleFilter} onChange={handleRoleChange}>
                    <option value="">Tất cả chức vụ</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                </select>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Chức vụ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.length === 0 ? (
                        <tr>
                            <td colSpan="5">Không có nhân viên nào phù hợp.</td>
                        </tr>
                    ) : (
                        currentEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                                <td>{employee.status === 'active' ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <button onClick={() => confirmDelete(employee._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />

            {/* Hộp thoại xác nhận xóa */}
            {deleteConfirm && (
                <div className="delete-confirmation">
                    <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
                    <button onClick={handleDeleteEmployee}>Xác nhận</button>
                    <button onClick={() => setDeleteConfirm(false)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
