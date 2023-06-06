import { get } from "svelte/store";
import { BASE_URL } from "../../stores/urls.js";

export async function fetchBook(title) {
      let book = null;
      const baseUrl = get(BASE_URL);
      const bookURL = `${baseUrl}/books/search/title-or-author/${encodeURIComponent(title)}`;
      console.log(bookURL);

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
            book = responseData[0]; // We're assuming that the response data is an array with the single book object as its first element
            console.log(`book: ${book}`);
            return book;
        }
        catch (e) {
            console.log(e);
        }
    }

    export async function fetchBook1() {
        try {
            const book = {
                "id": "nBcjFHkA9uYC",
                "title": "The Girl with the Dragon Tattoo and Philosophy",
                "author": "Eric Bronson",
                "description": "The essential companion to Stieg Larsson's bestselling trilogyand director David Fincher's 2011 film adaptation Stieg Larsson's bestselling Millennium Trilogy—The Girlwith the Dragon Tattoo, The Girl Who Played with Fire, andThe Girl Who Kicked the Hornet's Nest—is aninternational phenomenon. These books express Larsson's lifelongwar against injustice, his ethical beliefs, and his deep concernfor women's rights. The Girl with the Dragon Tattoo andPhilosophy probes the compelling philosophical issues behindthe entire trilogy. What philosophies do Lisbeth Salander and Kanthave in common? To catch a criminal, can Lisbeth and Mikael becriminals themselves? Can revenge be ethical? Drawing on some ofhistory's greatest philosophical minds, this book gives freshinsights into Larsson's ingeniously plotted tale of crime andcorruption. Looks at compelling philosophical issues such as a feministreading of Lisbeth Salander, Aristotelian arguments for why we loverevenge, how Kant can explain why so many women sleep with MikaelBlomkvist, and many more Includes a chapter from a colleague of Larsson's—whoworked with him in anti-Nazi activities—that exploresLarsson's philosophical views on skepticism and quotes fromnever-before-seen correspondence with Larsson Offers new insights into the novels' key characters, includingLisbeth Salander and Mikael Blomkvist, and investigates the author,Stieg Larsson As engrossing as the quest to free Lisbeth Salander from herpast, The Girl with the Dragon Tattoo and Philosophy isideal reading for anyone interested in unraveling the subtext andexploring the greater issues at work in the story.",
                "image": "http://books.google.com/books/content?id=nBcjFHkA9uYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                "subtitle": "Everything Is Fire",
                "categories": [
                    "Philosophy"
                ],
                "rating": 5,
                "page_count": 240,
                "publisher": "John Wiley & Sons",
                "published_date": "2011-09-20"
            };

            console.log(`book: ${book}`);
            return book;
        }
        catch (e) {
            console.log(e);
        }
    }