![webpage preview](https://github.com/CHIA-AN-YANG/Restaurant-List/blob/main/public/asset/restaurant-list_A4.JPG?raw=true)
# Restaurant List

Restaurant List is a private restaurant collection for foodies. You can view your favorite restaurants here. Add, modify, and record your own favorite restaurant with this restaurant list!

You can also interact with its online version at: https://powerful-everglades-45881.herokuapp.com/ 

## Installation

You can clone this project from here: [github link](https://github.com/CHIA-AN-YANG/Restaurant-List.git)
### 1. Web app installation
Clone with HTTPs:

```bash
git clone https://github.com/CHIA-AN-YANG/Restaurant-List.git
```
Alternatively, clone with SSH:
```bash
git clone git@github.com:CHIA-AN-YANG/Restaurant-List.git
```
Run npm install to install required plugins.

```bash
npm install
```
### 2. Database installation
1. download MongoDB's community service version(Not enterprise one) from MongoDB's website. Preferred filetype is msi.
2. Use Mango Campass or Roto 3T for GUI. Create a database connection at localhost 27170 (http://localhost). This host and port set is a preset location for mango database.

### 3. Set up environmental variables
Please refer to two separate env.example files: `env.example.local` and `env.example.remote`, for local and remote environmental variables on this webapp.

## About the Webpage
1. Click on the restaurant to see its detailed description and locate its position on google map.
2. Find the restaurant by any related letters with the search function. 
3. Add your new favorite restaurant with the orange button on index page. 
4. Modify or delete outdated restaurant with CRUD functions.

## Usage
The npm used in this project is **7.6.3**. This project is built under **Node.js v15.10.0** runtime environment, with Express framework.

### Start
To start it on local server, simply run the app.js file with `node` command in CLI:

```bash
node app.js
```
If you wish to automatically restarting the node application when file changes in the directory are detected, you may run nodemon.
Since the nodemon is intalled under project folder, it takes npx to run nodemon:

```bash
npx nodemon
```
or you can also use the script:
```bash
npm run dev
```
Now, enter http://localhost:3000/ in your browser and you are good to go!

### Seeding
This is the script for seeding, the seeder file is `userShopSeeder.js`, 
which produces information of two user with 6 restaurant data in total.
```
npm run seed
```
To view sample data on app, please log in with the following account after seeding:

- name:      seedUser1
- email:     user1@example.com
- password:  12345678

- name:      seedUser2
- email:     user2@example.com
- password:  12345678

## Contributing
Drop me a line in email if you have any suggestions for improvement! My email address is: chiaan.y.creativeworker@gmail.com
