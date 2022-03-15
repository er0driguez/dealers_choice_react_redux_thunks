const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4
    }, 
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    checkedOut: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

const Author = sequelize.define('author', {
    name: {
        type: Sequelize.STRING
    }
});

Book.belongsTo(Author);
Author.hasMany(Book);

const setup = async() => {
    try {
        await sequelize.sync({ force: true });

        const leguin = await Author.create({ name: 'Ursula K. LeGuin' });
        const butler = await Author.create({ name: 'Octavia Butler' });
        const dick = await Author.create({ name: 'Philip K. Dick' });

        await Book.create({ title: 'Left Hand of Darkness', checkedOut: true, authorId: leguin.id });
        await Book.create({ title: 'The Dispossesed', checkedOut: false, authorId: leguin.id });
        await Book.create({ title: 'Kindred', checkedOut: false, authorId: butler.id });
        await Book.create({ title: 'Parable of the Sower', checkedOut: false, authorId: butler.id });
        await Book.create({ title: 'A Scanner Darkly', checkedOut: false, authorId: dick.id });
        await Book.create({ title: 'Do Androids Dream of Electric Sheep?', checkedOut: true, authorId: dick.id });
    }
    catch(err) {
        console.log(err);
    }
};
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

setup();