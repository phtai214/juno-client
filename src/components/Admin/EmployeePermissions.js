import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../style/components/admin/EmployeePermissions.scss";

const EmployeePermissions = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [permissions, setPermissions] = useState({
        manageProducts: false,
        manageOrders: false,
        manageCustomers: false,
        customerSupport: false
    });
    const [isSaving, setIsSaving] = useState(false);

    // Fetch employees data
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/user');
                const employeeList = response.data.filter(user => user.role === 'employee');
                setEmployees(employeeList);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    // Fetch selected employee permissions
    const fetchEmployeePermissions = async (employeeId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/user/permissions/${employeeId}`);
            setPermissions(response.data.permissions || {});
        } catch (error) {
            console.error('Error fetching employee permissions:', error);
        }
    };

    // Handle employee selection
    const handleEmployeeChange = (event) => {
        const employeeId = event.target.value;
        setSelectedEmployee(employeeId);
        fetchEmployeePermissions(employeeId);
    };

    // Handle permission change
    const handlePermissionChange = (event) => {
        const { name, checked } = event.target;
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [name]: checked,
        }));
    };

    // Save permissions
    const handleSavePermissions = async () => {
        if (!selectedEmployee) return;
        setIsSaving(true);
        try {
            await axios.put(`http://localhost:3001/api/v1/user/${selectedEmployee}/permissions`, {
                permissions
            });
            alert("Quyền hạn đã được cập nhật thành công!");
        } catch (error) {
            console.error('Error saving permissions:', error);
            alert("Có lỗi xảy ra khi lưu quyền hạn.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="employee-permissions-container">
            <h2>Phân quyền nhân viên</h2>

            {/* Chọn nhân viên */}
            <select onChange={handleEmployeeChange} value={selectedEmployee || ''}>
                <option value="">Chọn nhân viên</option>
                {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                        {employee.name} - {employee.email}
                    </option>
                ))}
            </select>

            {/* Bảng quyền hạn */}
            {selectedEmployee && (
                <div className="permissions-list">
                    <h3>Chọn quyền hạn</h3>
                    <label>
                        <input
                            type="checkbox"
                            name="manageProducts"
                            checked={permissions.manageProducts || false}
                            onChange={handlePermissionChange}
                        />
                        Quản lý sản phẩm
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="manageOrders"
                            checked={permissions.manageOrders || false}
                            onChange={handlePermissionChange}
                        />
                        Quản lý đơn hàng
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="manageCustomers"
                            checked={permissions.manageCustomers || false}
                            onChange={handlePermissionChange}
                        />
                        Quản lý khách hàng
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="customerSupport"
                            checked={permissions.customerSupport || false}
                            onChange={handlePermissionChange}
                        />
                        Hỗ trợ khách hàng
                    </label>
                    <button onClick={handleSavePermissions} disabled={isSaving}>
                        {isSaving ? 'Đang lưu...' : 'Lưu quyền hạn'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmployeePermissions;
