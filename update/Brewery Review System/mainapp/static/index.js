var apiURL = "https://api.openbrewerydb.org/breweries?per_page=200"

   //Variables for pagination
       var array = [];
       var len =  0;
        var tableSize = 12;
        var startRow = 1;
        var endRow = 0;
        var currPage = 1;
        var maxPage = 0;
        var list = [];
        var resList = [];
        var array_list = [];

async function fetchBreweryList(api){
    var getApiResp = await fetch(api);
    var getPromise = await getApiResp.json();
    return getPromise;
}

function createCard(i) {
    var cardWrap = document.createElement('div');
    cardWrap.classList.add('card');
    cardWrap.style.width = "18rem";

    var hd1 = document.createElement('h5');
    hd1.classList.add('card-title');
    var titleLink = document.createElement('a');
    titleLink.style.color = '#007bff';
    titleLink.innerText = i.name;
    hd1.appendChild(titleLink);


    var hd2 = document.createElement('h6');
    hd2.innerText = "Type: " + i.brewery_type;

    var cardAddr = document.createElement('div');
    cardAddr.classList.add('card-addr');

    function getStarRating(rating) {
        const maxRating = 5;
        const roundedRating = Math.round(parseFloat(rating));
        const fullStars = '★'.repeat(roundedRating);
        const emptyStars = '☆'.repeat(maxRating - roundedRating);
        return `${fullStars}${emptyStars}`;
    }

    var addrP = document.createElement('p');
addrP.innerHTML = `
    <span style="font-weight: bold; font-size: 1.2em;">🏠 Brewery Address:</span> ${i.street}, ${i.city}, ${i.state}<br>
    <span style="font-weight: bold; font-size: 1.2em;">☎️ Phone number:</span> ${i.phone}<br>
    <span style="font-weight: bold; font-size: 1.2em;">🌐 <a href="${i.website_url}" target="_blank" style="text-decoration: none; color: #007bff;">Website</a></span><br>
    <span style="font-weight: bold; font-size: 1.2em;">⭐️ Current rating:</span> ${getStarRating(i.rating)} (${i.rating})<br>
    <span style="font-weight: bold; font-size: 1.2em;">🌍 State, City:</span> ${i.state}, ${i.city}
`;

// Add some additional styling to the entire paragraph
addrP.style.padding = '10px';
addrP.style.border = '1px solid #ddd';
addrP.style.borderRadius = '5px';

    var addReviewButton = document.createElement('a');
   addReviewButton.href = 'http://127.0.0.1:8000/brewery/' + i.id;
    addReviewButton.innerText = 'Add review';
    addReviewButton.classList.add('add-review-btn');

    // Append button to the address div
    cardAddr.appendChild(addrP);
    cardAddr.appendChild(addReviewButton);

    cardWrap.appendChild(hd1);
    cardWrap.appendChild(hd2);
    cardWrap.appendChild(cardAddr);

    var parent = document.querySelector('#card-parent');
    parent.appendChild(cardWrap);

    // Add an event listener to the button if needed
    addReviewButton.addEventListener('click', function() {
        console.log('Add review clicked for:', i.name);
    });
}


// Call this function before fetching the brewery list
function beforeFetch() {
        var parent = document.querySelector('#card-parent');
        parent.innerHTML = '';
        var search = document.querySelector('#search-term');
        search.value = '';
        var res = document.querySelector('#result-term');
        res.value = '';
        showLoadingSpinner();
    }

    async function breweryAPI() {
        try {
            beforeFetch();
            
            list = await fetchBreweryList(apiURL);
            array_list = list;
            var result = document.querySelector('.result');
            result.innerHTML = `<h4>${list.length} breweries found</h4>`;
            // Creating pagination
            paginationButtons();
        } catch (err) {
            console.log(err);
            var modal = document.querySelector('.modal');
            var modalmsg = document.querySelector('#modal-msg');
            modalmsg.innerHTML = 'Error fetching brewery list <br>' + err;
            modal.style.display = 'block';
        }
    }


    function showLoadingSpinner() {
        var result = document.querySelector('.result');
        result.innerHTML = `<div class="loading-spinner"></div><p>Loading...</p>`;
      }
// find Brewery filter fetch data
    async function findbreweryAPI(apiBy,fil_value,search_term) {

        try {
            list = await fetchBreweryList(apiBy);
            var parent = document.querySelector('#card-parent')
            parent.innerHTML = "";
            var res = document.querySelector('#result-term')
            res.value = "";
            var result = document.querySelector('.result')
            result.innerHTML = `<h4> ${list.length} results found </h4>`
            array_list = list;
            paginationButtons();

        }
        catch(err){
            console.log(err);
            var modal = document.querySelector('.modal')
            var modalmsg = document.querySelector('#modal-msg')
            modalmsg.innerHTML = `Error fetching brewery list for this ${fil_value} and ${search_term} <br> ${err}`;
            modal.style.display = 'block';
        }

    }

    // create API-url from filter choices
    var form = document.querySelector('.header form')
        form.addEventListener('submit',(e)=>{
            e.preventDefault();

            var filterby = document.querySelector('#filterby')
            var fil_value = filterby.value;
            //console.log(fil_value); // name type city state

            var search = document.querySelector('#search-term')
            var search_term = search.value;
            search_term = search_term.trim();
            search_term = search_term.toLowerCase();
            //console.log(search_term);
            var apiBy;
            if( fil_value == "name")  {
                 apiBy = `https://api.openbrewerydb.org/breweries?by_name=${search_term}&per_page=100`
            }
            else if( fil_value == "type")  {
                 apiBy = `https://api.openbrewerydb.org/breweries?by_type=${search_term}&per_page=100`
            }
            else if( fil_value == "city")  {
                search_term = search_term.split(" ").join("_")
                 apiBy = `https://api.openbrewerydb.org/breweries?by_city=${search_term}&per_page=100`
            }
            else if( fil_value == "state")  {
                search_term = search_term.split(" ").join("_")
                 apiBy = `https://api.openbrewerydb.org/breweries?by_state=${search_term}&per_page=100`
            }

         findbreweryAPI(apiBy,fil_value,search_term);
    })

    // determines total pages required
    function paginationButtons(){
        array = array_list;
        len =  array.length;
        startRow = 1;
        endRow = tableSize;
        currPage = 1;
        maxPage = Math.ceil(len/tableSize);
      //console.log("in pagination",maxPage,startRow,endRow,len);
        createButtons();
    }

    //creates button for all the pages
    function createButtons() {
        var page_btn = document.querySelector("#page-btn");
        page_btn.innerHTML = "";

        for(i=1; i<=maxPage; i++){
          //  console.log("in create",i);
            var btn = document.createElement('button')
            btn.setAttribute('id', `btn-${i}`)
            btn.setAttribute('onclick', "pageEvent(this)")
            btn.innerText = i;
            page_btn.append(btn);
        }
        currentPage();

    }

   // gets and displays the current page
    function currentPage(){
        var tableSize = 12
        startRow = ((Number(currPage))-1) * Number(tableSize) + 1;
        endRow = (startRow + Number(tableSize)) - 1;
       // console.log(currPage,tableSize,startRow,endRow);
        if(endRow > len)
           endRow = len;

         displayCard();
        var page_show = document.querySelector("#showing");
        if( len != 0)
        page_show.innerHTML = `${startRow} to ${endRow} of ${len} results`
        else
        page_show.innerHTML = ` ${len} results`;
        var selectPage = "#btn-"+currPage
        //console.log(selectPage)
        var selectedPage = document.querySelector(selectPage)
        //console.log(selectedPage)
        if(selectedPage != null)
        selectedPage.classList.add("active");

    }

    // called everytime user clicks on a page button
    function pageEvent(e){
        currPage = Number(e.innerText);
        tableSize = 12;
        //console.log("button clicked");
        var prevSel = document.querySelector("#page-btn button[class='active']")
       // console.log(prevSel);
       if(prevSel != null)
        prevSel.classList.remove("active");
        currentPage();
    }


   // determines the data to be displayed for selected page
    function displayCard(){
        try{
        //console.log("calling card", currPage);
        var parent = document.querySelector('#card-parent')
        parent.innerHTML = "";
        var start = startRow - 1;
        var end = endRow;
        for(let j=start; j<end; j++){
           // console.log("calling card", currPage, j, list[j]);
            createCard(array_list[j]);
        }
        }
        catch(err){
            console.log("error writing card");
        }

    }

    //form to filter the displayed results
    var resform = document.querySelector('#filter-form');
    resform.addEventListener('submit',(e)=>{
        e.preventDefault();
        populateResult();

    })

    // after implementing filter on current results, display the new result
    function populateResult(){
        var parent = document.querySelector('#card-parent')
        parent.innerHTML = "";
        var filterby = document.querySelector('#resultFilter')
            var fil_value = filterby.value;
            //console.log(fil_value); // name type city state
            var search = document.querySelector('#result-term')
            var search_term = search.value;
            search_term.trim();
            search_term = search_term.split(" ").join(" ")
            search_term = search_term.toLowerCase();
            try{
               resList = [];
                for( k of array_list){
                    if(k[fil_value] != null) {
                        let data = k[fil_value].toLowerCase();
                      //  console.log(data.includes(search_term), search_term,data)
                        if( data.includes(search_term)){
                            resList.push(k);
                        }
                    }
                    else{

                    }
                }
                try {
                  var result = document.querySelector('.result')
                  result.innerHTML = `<h4> ${resList.length} results found </h4>`
                  array_list = resList ;
                 // console.log(list.length,resList.length)
                 //console.log("calling pagination from filter",startRow,endRow);
                  paginationButtons();

              }
              catch(err){
                  console.log(err);
                  var modal = document.querySelector('.modal')
                  var modalmsg = document.querySelector('#modal-msg')
                  modalmsg.innerHTML = `Error filtering result for this ${fil_value} and ${search_term} <br> ${err}`;
                  modal.style.display = 'block';
              }

            }
            catch(err){
                console.log(err);
                var modal = document.querySelector('.modal')
                var modalmsg = document.querySelector('#modal-msg')
                modalmsg.innerHTML = `Error filtering result ${fil_value} and ${search_term} <br> ${err}`;
                modal.style.display = 'block';
            }



    }
    function resetList(e){
        array_list = list;
        var search = document.querySelector('#result-term')
            search.value = "";
        var result = document.querySelector('.result')
        result.innerHTML = `<h4> ${array_list.length} results found </h4>`
        paginationButtons();
    }
    


