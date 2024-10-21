import React from 'react';

const Employees = () => {
    // Giả định bạn có một mảng nhân viên
    const employees = [
        { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', email: 'a@example.com' },
        { id: 2, name: 'Trần Thị B', position: 'Nhân viên bán hàng', email: 'b@example.com' },
        { id: 3, name: 'Lê Văn C', position: 'Kế toán', email: 'c@example.com' },
    ];

    return (
        <div className="employees-page">
            <h1>Quản lý nhân viên</h1>
            {employees.length === 0 ? (
                <p>Không có nhân viên nào.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Chức vụ</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.position}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Thêm các chức năng quản lý nhân viên, như chỉnh sửa, xóa, thêm nhân viên mới */}
        </div>
    );
};

export default Employees;
