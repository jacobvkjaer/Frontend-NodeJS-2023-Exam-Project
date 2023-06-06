<script>
    import { get } from "svelte/store";
    import { BASE_URL } from "../../stores/urls.js";
    import { user } from "../../stores/user.js";
    import { onMount } from "svelte";
    import { Grid, Row, Column, ImageLoader } from "carbon-components-svelte";

    let books = [];

    async function fetchBooks() {
        
        const baseUrl = get(BASE_URL); 
        const bookURL = baseUrl + "/books/search/title-or-author/A Clockwork Orange";

        try {
            const response = await fetch(bookURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const responseData = await response.json();
            console.log("Received data: ", responseData);
            books = responseData;
        }
        catch (e) {
            console.log(e);
        }
    };
    
    // onMount(fetchBooks);
</script>


<div class="container">
  <Grid fullWidth>
    <Row noGutter>
      <Column class="header-column" sm={1} md={4} lg={8} xlg={14} max={16}>
        <h1>Reviews</h1>
      </Column>
    </Row>
  {#if books.length}
    {#each books as book (book.id)}
        <Row noGutter>
              <Column class="image-column" sm={1} md={1} lg={2} xlg={2} max={2}>
                <div class="image-container">
                  <ImageLoader src={book.image}/>
                </div>
              </Column>
              <Column class="title-column" sm={4} md={4} lg={10} xlg={10} max={10}>
                <div class="book-title">
                  <Row class="title-row">
                    <Column class="title-row-column-1" sm={1} md={4} lg={4} xlg={4} max={7}><h2>{book.title}</h2></Column>
                    <Column class="title-row-column-2" sm={1} md={2} lg={2} xlg={2}  max={4}><h2>||</h2></Column>
                    <Column class="title-row-column-3" sm={1} md={4} lg={4} xlg={4} max={5}><h2>{book.author}</h2></Column>
                  </Row>
                </div>
                <div class="book-description">
                  <p class="book-content">{book.description}</p>
                </div>
              </Column>
              <Column class="buffer-column" sm={2} md={2} lg={4} xlg={4} max={4}></Column>
        </Row>
    {/each}
  {:else}
      <Row noGutter>
        <Column sm={1} md={1} lg={1} xlg={16} max={16}>
          <div class="p-text">
            <p>Loading...</p>
          </div>
        </Column>
      </Row>
  {/if}
    </Grid>
</div>



<style>
  
.container {
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding: 2em 1em;
  color: #f4f4f4;
}

h1 {
  text-align: center;
  margin: 0 0 0.7em 0; 
  color: #cdd1d4;
  font-size: 4em;
}

:global(
  .header-column.bx--col-sm-1.bx--col-md-4.bx--col-lg-8.bx--col-xlg-14.bx--col-max-16
  ) {
  border-bottom: 1px solid #523A28; /* add line to separate rows */
  
}

:global(
  .image-column.bx--col-sm-1.bx--col-md-1.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2,
  .title-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
  ) {
  /* margin-bottom: 20px; */
  padding-bottom: 20px;
  padding-top: 20px;
  align-items: start; /* align content at the top of the row */
  border-bottom: 1px solid #523A28; /* add line to separate rows */  
}

:global(
  .image-column.bx--col-sm-1.bx--col-md-1.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2
  ) {
  padding-right: 20px;
  border-right: 1px solid #523A28;
}

:global(
  .title-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
  ) {
  padding-left: 20px;
  padding-right: 20px;
  border-right: 1px solid #523A28;
}

:global(
  .buffer-column.bx--col-sm-2.bx--col-md-2.bx--col-lg-4.bx--col-xlg-4.bx--col-max-4
  ) {
  padding-left: 20px;
  padding-right: 20px;
  /* border-right: 1px solid #523A28; */
  border-bottom: 1px solid #523A28;
}

.book-title, .book-description {
  overflow-wrap: break-word;
  word-wrap: break-word; /* for older browsers */
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* hide overflowing part of the image */
  /* margin-right: 4em; */
}

.image-container img {
  width: 100%;
  height: auto;  /* maintain aspect ratio */
}

.book-title {
  margin: 0 0 1em 0;
  padding: 0 0 20px 20px;
  font-size: 2em;
}

.p-text {
  text-align: center;
  margin: 1em 0 1.2em 0; 
  color: #cdd1d4;
}
</style>