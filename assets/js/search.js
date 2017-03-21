 //storing the search key object
 var searchKey = $('#search_F');

 //storing the search button object
 var searchBtn = $('#searchCTA');

 //storing the form object
 var searchForm = $('#search_Form');

 //Search result variable;
 var searchRes = $('.searchResults');


 /*This function created is to make the ajax call
 and return the json format of the processed data*/
 function sendViaAjax(mform) {
     //creating an array to hold every input data in the form
     var sForm_data = {};

     /*using the find() method, every element in the form with the 'name' attribute 
     is obtained*/
     mform.find('[name]').each(function(index, value) {
         //The value of the 'name' attribute is stored in the variable
         var name = $(this).attr('name');

         //The value of the input object is stored in the variable as well.
         var value = $(this).val();

         /*The name which acts as a key and the value which, well acts as a value(lol) is 
         stored in the sForm_data array*/
         sForm_data[name] = value;

     });

     //Calling jquery's ajax method
     $.ajax({
         //Location to the processing file.
         url: 'dataProcess.php',

         //Type is the method, whether its a POST or GET
         type: mform.attr('method'),

         //Data refers to the data that is to be sent via the server
         /*Im passing an arrary to server which can then be accessed by
         the key of the array. Eg. In php we can access and store a particular value
         from the array using the key. If the key in the array was 'J', in order to 
         get and store it in a variable in php, it goes like this $_POST['J'].
         It took sometime to figure it out but I did by Gods grace. All thanks to Him.*/
         data: sForm_data,

         dataType: 'json',

         //The below callback function is called once the communication is successful
         success: function(response) {

             /*console.log('Test Data :' + response.testData);
             console.log('Sent Key :' + response.passed);*/
             //console.log(response.user_color[0]);


             var htmlElem, colElem;
             searchRes.empty();
             searchRes.html("<p>Found " + response.dataSize + " people</p>");
             for (var i = 0; i < response.dataSize; i++) {
                 console.log('Fetched username : ' + response.user_name[i]);
                 colElem = 'c' + i;
                 htmlElem = "<div class='chip " + colElem + "'>";
                 htmlElem += "<img src='https://organicthemes.com/demo/profile/files/2012/12/profile_img.png' alt='Contact Person'>" + response.user_name[i];
                 htmlElem += "</div>";
                 searchRes.append(htmlElem);

                 cclass = ".c" + i;
                 $(cclass).css('background-color', response.user_color[i]);
                 $(cclass).css("color", "white");

             }



         },

         //Or else when theres an error, this callbackfunction is called.
         error: function() {
             console.log("Couldnt transfer data.");
             searchRes.html("<h1><i class='fa fa-frown-o' aria-hidden='true'></i></h1>");
             searchRes.append("<h4>Sorry, theres nothing like that.</h4>");

         }
     });

 }


 //This overwrites the default action of when the enter button is pressed
 $(window).keydown(function(event) {
     if (event.keyCode == 13) {
         sendViaAjax(searchForm);
         return false;

     }
 });



 //fires up the sendViaAjax function once the button is clicked.
 searchBtn.click(function(event) {
     sendViaAjax(searchForm);
 });