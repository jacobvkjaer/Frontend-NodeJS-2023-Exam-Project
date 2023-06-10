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
    
    export async function fetchBook2() {
        try {
            const book = {
                "id": "_6cxEAAAQBAJ",
                "title": "1984",
                "author": "George Orwell",
                "description": "George Orwell is the pen name of the author, Eric Arthur Blair. He was an English essayist, novelist, journalist and critic. His writings are based on social criticism, anti-Fascism, anarchism and support to democratic Socialism. His work remains influential in popular culture and political culture. 1984, a novel, is based on dystopian social science. Its theme is projected on the consequences of mass surveillance, totalitarianism and societal behavior aspect. The author had been a democratic socialist. Mostly, the novel narrates the truth and facts within politics and how come these are manipulated. The author has narrated in on imaginary manner when most of the parts of the world has fallen victim to perpetual war, global mass surveillance, historical nogationism. A huge, propaganda is there. The story reveals that Great Britain, known as Arstri One, has become a province of totalitarian superstate named Okeania. The leader of the party is Big Brother. Actually, its a cult of personality and arises anyone uses the techniques of mass media, social networking, government organised demonstrations and ralies to create an image of a leader. It is often seen in totalitarian or authorisation states. Winston Smith is a protagonist, who is very skillful and outer party member and hates the Party and dreams of rebellion. His relationship with Julia has also come up. 1984 has become a classic literacy example of political and dystopian fiction. Time magazine included this novel on its 100-best English-language novels. Although, Orwell was hesitating for this title but Warbury (the Publisher) suggested this which he took to be a more commercially viable choice. The story behind its title is also very interesting, when Orwell finished this novel in 1948, this title was chosen simply as the inversion of this year. So, at last, in the story, there is a celebration of massive victory of Okeanias over Eurasian armies in Africa. Also, Winston accepted that he loves Big Brother. How this happened? What were the circumstances Winston refused to love Julia? How this political storm took place? For all, the story reveals step by step in an interesting manner. A mind-blowing novel of that time and forever.",
                "image": "http://books.google.com/books/content?id=_6cxEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                "categories": [
                    "Fiction"
                ],
                "page_count": 320,
                "publisher": "Diamond Pocket Books Pvt Ltd",
                "published_date": "2021-06-04"
            };

            console.log(`book: ${book}`);
            return book;
        }
        catch (e) {
            console.log(e);
        }
    }
    
    export async function fetchBook3() {
        try {
            const book = {
                "id": "vqRkEAAAQBAJ",
                "title": "Animal Farm",
                "author": "George Orwell",
                "description": "Orwell’s masterpiece! Animal Farm dives deep into the realm of a group of farm animals owned by a cruel and devious farmer. Once the animals rebel against the human tyranny, they create their own society where everyone is supposed to be free and equal. However, the animal-led farm faces it’s own struggles and a dictatorship developes admist their socialist farm of comrades. Napolean, a ferocious hog becomes their leader. Under his rule, are some animals maybe more equal than others?",
                "image": "http://books.google.com/books/content?id=vqRkEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                "categories": [
                    "Fiction"
                ],
                "rating": 4,
                "page_count": 102,
                "publisher": "BoD – Books on Demand",
                "published_date": "2022-03-15"
            };

            console.log(`book: ${book}`);
            return book;
        }
        catch (e) {
            console.log(e);
        }
    }
    
    export async function fetchBook4() {
        try {
            const book = {
                "id": "UbfnTcmkaKkC",
                "title": "The Stand",
                "author": "Stephen King",
                "description": "The tie-in edition of the nine-part CBS All Access series starring Whoopi Goldberg, Alexander Skarsgard, and James Marsden. When a man escapes from a biological testing facility, he sets in motion a deadly domino effect, spreading a mutated strain of the flu that will wipe out 99 percent of humanity within a few weeks. The survivors who remain are scared, bewildered, and in need of a leader. Two emerge--Mother Abagail, the benevolent 108-year-old woman who urges them to build a peaceful community in Boulder, Colorado; and Randall Flagg, the nefarious \"Dark Man,\" who delights in chaos and violence. As the dark man and the peaceful woman gather power, the survivors will have to choose between them--and ultimately decide the fate of all humanity.",
                "image": "http://books.google.com/books/content?id=UbfnTcmkaKkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                "categories": [
                    "Fiction"
                ],
                "rating": 4.5,
                "page_count": 1200,
                "publisher": "Anchor",
                "published_date": "2008-06-24"
            };

            console.log(`book: ${book}`);
            return book;
        }
        catch (e) {
            console.log(e);
        }
    }