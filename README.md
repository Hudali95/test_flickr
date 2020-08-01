
# Flickr Web Application

To run this application in your local machine please follow steps -

# 1. Clone this repo

# 2. Run NPM install to install all the dependencies

# 3. Start UI with NPM run react_start ,and server with NPM run server_start

# 4. To fetch the values from Flickr API you must have their appKey, and secretKey - [Paste both keys in config/stage.yml]

      Please visit this https://www.flickr.com/services/api/ and paste both keys in Stage.yml file

# Features of current version of Application

# There are 3 pages in the UI and for connecting with Flickr's API, I am using ExpressJs

# Page 1 - Home

User should enter the query and shold select the option to search for!

# Page 2 - Gallery

User will see the gallery of images in layout asked for. I have not used any UI packages so, the layout may not look similar to Google or Pinterest's layout. Have just used some basic CSS techniques to create the layout for the gallery.

Onclicking any of the images, a modal will open with image in larger size with some details regarding the image.

# Page 3 - Groups

This page will display the list of groups related to the user query. I have just tried to include only the data given by the flickr API.

On clicking the Group's icon user will be redirected to Flicker's group page.

# P.S -

# Flicker's API endpoint I used are puclic, hence they do not need any permissions. These are the basic endpoints without any requiring permissions such as Read, Write and Delete...
