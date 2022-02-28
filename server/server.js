const express = require('express');
const cors = require('cors');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { redirect } = require("express/lib/response");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({limit: '50mb'}));

const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
        apikey: process.env.DISCOVERY_APIKEY,
    }),
    serviceUrl: 'https://api.eu-gb.discovery.watson.cloud.ibm.com',
});

app.post('/api/:query', (req, res) => {
    
    const testVar = (req.params.query);
    
    console.log("Param " + req.params.query);

const queryParams = {
    environmentId: '660d1e9c-b51f-4c3d-97ca-73007c08b4f1',
    collectionId: 'a205c956-5df3-48ff-9cd4-7044bb153772',
    query: testVar,
    highlight: true,
    passages: true,
    passagesCount: 1,
    passagesCharacters: 50,
    count: 1,
};

    

    discovery.query(queryParams)
    .then(queryResponse => {

        const searchObject = JSON.parse(JSON.stringify(queryResponse, null, 2));
        
        const passage1 = ('MOST RELEVANT PASSAGE:  ' + searchObject.result.passages[0].passage_text +'.....');
        // const passage2 = 'Relevant PASSAGE:  ' + searchObject.result.passages[1].passage_text + "  SCORE:  " + searchObject.result.passages[1].passage_score;
        // const passage3 = 'Relevant PASSAGE:  ' + searchObject.result.passages[2].passage_text + "  SCORE:  " + searchObject.result.passages[2].passage_score;
        // const passage4 = 'Relevant PASSAGE:  ' + searchObject.result.passages[3].passage_text + "  SCORE:  " + searchObject.result.passages[3].passage_score;
        // const passage5 = 'Relevant PASSAGE:  ' + searchObject.result.passages[4].passage_text + "  SCORE:  " + searchObject.result.passages[4].passage_score;

        const text1 = ('  TEXT RESULT :  ' + searchObject.result.results[0].text + '.....');
        // const text2 = '  TEXT RESULT :  ' + searchObject.result.results[1].text;
        // const text3 = '  TEXT RESULT :  ' + searchObject.result.results[2].text;
        // const text4 = '  TEXT RESULT :  ' +  searchObject.result.results[3].text;
        // const text5 = '  TEXT RESULT :  ' +  searchObject.result.results[4].text;
        
        const sent1 = (searchObject.result.results[0].enriched_text.sentiment.document.label);
        const sentiment1 = ('  SENTIMENT :  ' + sent1 + '.....');
        // const sentiment2 = 'Text SENTIMENT :  ' + searchObject.result.results[1].enriched_text.sentiment.document.label;      
        // const sentiment3 = 'Text SENTIMENT :  ' + searchObject.result.results[2].enriched_text.sentiment.document.label;      
        // const sentiment4 = 'Text SENTIMENT :  ' + searchObject.result.results[3].enriched_text.sentiment.document.label;      
        // const sentiment5 = 'Text SENTIMENT :  ' + searchObject.result.results[4].enriched_text.sentiment.document.label;      

        //const cat1 = (searchObject.result.results[0].enriched_text.categories[0].labels);
        // const categories1 = (' CATEGORIES :  ' + cat1);
        // // const categories2 = 'CATEGORIES :  ' + searchObject.result.results[1].enriched_text.categories[1].labels;
        // const categories3 = 'CATEGORIES :  ' + searchObject.result.results[2].enriched_text.categories[2].labels;
        // const categories4 = 'CATEGORIES :  ' + searchObject.result.results[3].enriched_text.categories[3].labels;
        // const categories5 = 'CATEGORIES :  ' + searchObject.result.results[4].enriched_text.categories[4].labels;
        
      
        // let textKeywords = "";
        // for (let i = 0; i < searchObject.result.results[0].enriched_text.keywords.length; i++) {
        //   textKeywords += searchObject.result.results[0].enriched_text.keywords[i].text + ", ";
        // }
        // console.log('Text KEYWORDS: ' + textKeywords);

        // Loop for returning multiple TEXT results with accompanying SENTIMENT... 
        // CATEGROIRES, and KEYWORDS for each result
    //     
        
        //for (let i = 0; i < searchObject.result.results.length; i++) {
        let keyWords = [];
        let textKeywords = "";
        for (let j = 0; j < searchObject.result.results[0].enriched_text.keywords.length; j++) {
          textKeywords += searchObject.result.results[0].enriched_text.keywords[j].text + ", ";
        }
        keyWords = ' KEYWORDS :  ' + textKeywords;
      

        // const textResult = 'TEXT RESULT  '+ searchObject.result.results[0].text + '  TEXT RESULT :  ' +  searchObject.result.results[1].text
        // + '  TEXT RESULT :  ' +  searchObject.result.results[2].text+ '  TEXT RESULT :  ' +  searchObject.result.results[3].text
        // + ' TEXT RESULT : ' +  searchObject.result.results[4].text;

        // const result1 = passage1 + sentiment1 + categories1 + text1;
        // const result2 = passage2 + text2 + sentiment2 + categories2 + keywords2;
        // const result3 = passage3 + text3 + sentiment3 + categories3 + keywords3;
        // const result4 = passage4 + text4 + sentiment4 + categories4 + keywords4;
        // const result5 = passage5 + text5 + sentiment5 + categories5 + keywords5;

        // const resultString = (result1 + '  ' + result2 + ' ' + result3 + ' ' + result4 + ' ' + result5);

        res.json(passage1 + text1 + sentiment1 + keyWords);
        
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});