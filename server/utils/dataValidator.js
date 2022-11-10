const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient();

async function validateRegistration(username, password, email, confirmPassword) {
    if (!username || !email || !password || !confirmPassword) {
        return {
            check: false,
            message: "Make sure all fields are filled."
        }
    }

    const existingUser = await prisma.user.findFirst({ where: { email: email } })
    if (existingUser) {
        return {
            check: false,
            message: "User with that email already exists."
        }
    }

    console.log(password, confirmPassword)
    if (password !== confirmPassword) {
        return {
            check: false,
            message: "Passwords do not match."
        }
    }

    if (!validateEmail(email)) {
        return {
            check: false,
            message: "Invalid email format."
        }
    }

    return { check: true }
}

async function validateUserDetails(uid, options) {
    const { username, email, profilePicture } = options;

    if (!username || !email || !profilePicture) {
        return {
            check: false,
            message: "Invalid data. Make sure all required fields are filled."
        }
    }

    if (!validateEmail(email)) {
        return {
            check: false,
            message: "Invalid email value. Make sure you have entered an email"
        }
    }

    return { check: true }
}

async function validatePasswordUpdate(uid, oldPassword, newPassword, newPasswordConfirm) {
    if (newPassword !== newPasswordConfirm) {
        return {
            check: false,
            message: "Passwords do not match."
        }
    }

    // Not null or empty

    if (!newPassword || !oldPassword || !newPasswordConfirm) {
        return {
            check: false,
            message: "Password field cannot be empty."
        }
    }

    // User null

    if (!uid) {
        return {
            check: false,
            message: "Error updating password. User not found."
        }
    }

    return { check: true }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = {
    validatePasswordUpdate,
    validateRegistration,
    validateUserDetails
}