const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // --- Your details ---
        const fullName = "anupam_mishra";
        const dob = "15082004";
        const email = "anupam.mishra2022@vitstudent.ac.in";
        const rollNumber = "22BEC0020";
        // --------------------

        const userId = `${fullName}_${dob}`;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: userId,
                error: "The 'data' key with an array is required in the request body."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let concat_chars = [];

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(item));
                } else {
                    odd_numbers.push(String(item));
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                concat_chars.push(...item.split(''));
            } else {
                special_characters.push(item);
            }
        });

        const reversed_chars = concat_chars.reverse();
        const concat_string = reversed_chars.map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');

        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            user_id: "your_name_ddmmyyyy",
            error: `An unexpected error occurred: ${error.message}`
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
