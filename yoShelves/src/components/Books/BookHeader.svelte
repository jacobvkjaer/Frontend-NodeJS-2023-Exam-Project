<script>
    export let book;
</script>
<h1>{book?.title || "Loading..."}</h1>

<style>
    h1 {
        text-align: center;
        margin: 0 0 0.7em 0; 
        color: #cdd1d4;
        font-size: 4em;
    }
</style>
