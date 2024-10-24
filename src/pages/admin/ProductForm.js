import React, { useState } from 'react';
import axios from 'axios';
import '../../style/pages/admin/ProductForm.scss'; // Tạo file CSS cho form nếu cần

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState('');
    const [flashSalePrice, setFlashSalePrice] = useState(null);

    const apiUrl = 'http://localhost:3001/api/v1/product/create'; // Thay URL API phù hợp

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleTagsChange = (e) => {
        setTags(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('category', category);
            if (image) {
                formData.append('image', image);
            }
            formData.append('tags', JSON.stringify(tags.split(',')));
            if (tags.includes('FLASH-SALE')) {
                const flashPrice = price * 0.9; // Giảm giá 10%
                formData.append('flash_sale_price', flashPrice);
                setFlashSalePrice(flashPrice);
            }

            await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Product created successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>Hello world</div>
    );
};

export default ProductForm;
