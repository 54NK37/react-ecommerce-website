1)Download this repository and store in a folder.

2)In the terminal traverse to that folder and run "npm install".

3)Edit baseURL inside "./src/axios.js" file and replace with your server URL.You may refer my another repository "node-ecommerce-website" and there postman app is not needed anymore (Website will make request to server instead of postman ).

3)On one terminal start node server with "npm run dev" which will run on 
  "http:/localhost:3000"."node-ecommerce-website" repository in my case.Make sure your terminal path is set to that repository.

4)On second terminal start mongo server with "mongod --dbpath "[db path]" ".

5)On third terminal start react app with "npm start".Type "Yes" so that it will start on different url "http:/localhost:3001" because port 3000 is busy with node server.Make sure your terminal path is set to same as in step 1.

6)You may refer "./src/Website_Screenshots" to see UI of my website.