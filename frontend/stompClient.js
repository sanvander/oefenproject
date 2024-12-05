const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/websocket' // Het protocol is niet HTTP, maar WS. Dit is de URL naar onze lokale server.
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    //
    // // Hier zeggen we wat er moet gebeuren als er een nieuw bericht komt van de server.
    // stompClient.subscribe('/topic/messages', (message) => {
    //     // Oké, dit ziet er misschien wat gek uit, ik leg het even uit per regel:
    //     showMessage( // We zeggen dat de showMessage functie aangeroepen worden
    //         JSON.stringify( // Met JSON.stringify probeer ik een JavaScript object om te zetten naar nette JSON...
    //             JSON.parse(message.body), // ... maar de body van de response is al een string, waarin alles op één regel staat. Dus ik parse het eerst naar een JavaScript object, om het daarna weer netjes te maken met JSON.stringify.
    //             null, // Niet relevant, is nodig voor het 'pretty printen'
    //             2) // De indentatie
    //     );
    // });


    // Hier zeggen we wat er moet gebeuren als er een nieuw bericht komt van de server.
    stompClient.subscribe('/topic/person', (person) => {
        // Oké, dit ziet er misschien wat gek uit, ik leg het even uit per regel:
        showPerson( // We zeggen dat de showMessage functie aangeroepen worden
            JSON.stringify( // Met JSON.stringify probeer ik een JavaScript object om te zetten naar nette JSON...
                JSON.parse(person.body), // ... maar de body van de response is al een string, waarin alles op één regel staat. Dus ik parse het eerst naar een JavaScript object, om het daarna weer netjes te maken met JSON.stringify.
                null, // Niet relevant, is nodig voor het 'pretty printen'
                2) // De indentatie
        );

    });
};

function setConnected(connected) {
    document.querySelector('#connect').disabled = connected;
    document.querySelector('#disconnect').disabled = !connected;
}

function connect() {
    stompClient.activate();
}


function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log('Disconnected');
}

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

// En een bericht error
stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};



//FF testen of het werkt
function showPerson(person){
    document.querySelector('#person').textContent += `${person}\n\n`;
}





