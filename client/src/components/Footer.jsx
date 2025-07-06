import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div class="dashboard-footer">
            <div class="flex-between flex-wrap gap-16">
                <p class="text-gray-300 text-13 fw-normal"> &copy; Copyright CodeExpress 2025, All Rights Reserved</p>
                <div class="flex-align flex-wrap gap-16">
                   <Link to="/about" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">About</Link>
                    <Link to="/support" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Support</Link>
                </div>
            </div>
        </div>

    )
}

export default Footer