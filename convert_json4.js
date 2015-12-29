// Split on row
//////////////////////////////////////////////my code by Abhinav Ashesh

fs = require('fs')
fs.readFile('./data_csv.csv', 'utf8', function (err,f) {
  if (err) {
    return console.log(err);
  }
//  console.log(f);


var fss = f.split('\r\n');
var header=fss[0].split(",");
var arrState =["Karnataka","Kerala","Andhra Pradesh","Tamil Nadu"];
var tmp={};
var json=[];
var flag=0;


for(var i=3;i<header.length;i++)                                          //looping for the number of times as header data
{
  flag=0;
  tmp={};
  var tmp1={};
  for(var z=0;z<arrState.length;z++)
  {
    for(var j=1;j<fss.length;j++)
    {
      //tmp1={};
        if((fss[j].search(arrState[z])) !== -1 && (fss[j].search("Rice")) !== -1 && (fss[j].search("Yield")) !== -1)
        {
          row = fss[j].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          //console.log(row);
          if (row[2] == "kg/ha")
          {
            console.log(((row[i]=='NA')?0:parseInt(row[i])));
            tmp1[arrState[z]]=((row[i]=='NA')?0:parseInt(row[i]));
            //flag=1;
            //console.log(tmp1[arrState[z]], arrState[z]);
          }
        }
        //console.log(tmp1);
    }

  }
  tmp["year"]=header[i].substring(3,header[i].length);
  tmp["state_prod"]=tmp1;
  json.push(tmp);
  }

  console.log(json);

  console.log(json.length);
  fs.writeFile('my_json.json', JSON.stringify(json) , function (err)
  {
  if (err) return console.log(err);
});//write funciton closes here

});
