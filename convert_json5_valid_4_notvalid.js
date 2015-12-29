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
for(var t=3;t<header.length;t++)
{
  header[t]=header[t].substring(3,header[t].length);
}
var arrState ={
                karnataka:{},
                kerala:{},
                "andhra Pradesh":{},
                "tamil Nadu":{},
              };
var tmp={};
var json=[];
var flag=0;

//console.log(arrState[karnataka])
for(var line_no=1;line_no<fss.length;line_no++)
{
  if(fss[line_no].search("Rice Yield Karnataka")!=-1)
  {
    //console.log("hurrey found the karnataka state");
    row = fss[line_no].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log(row);
    if (row[2] == "kg/ha")
    {
      for(var row_no=3;row_no<row.length;row_no++)
      {
        arrState["karnataka"][header[row_no]]=(row[row_no]=='NA')?0:parseFloat(row[row_no]);
      }
    }
  }
  if(fss[line_no].search("Rice Yield Tamil Nadu")!=-1)
  {
    //console.log("hurrey found the Tamil Nadu state");
    row = fss[line_no].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log(row);
    if (row[2] == "kg/ha")
    {
      for(var row_no=3;row_no<row.length;row_no++)
      {
        arrState["tamil Nadu"][header[row_no]]=(row[row_no]=='NA')?0:parseFloat(row[row_no]);
      }
    }
  }
  if(fss[line_no].search("Rice Yield Kerala")!=-1)
  {
    //console.log("hurrey found the kerela state");
    row = fss[line_no].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log(row);
    if (row[2] == "kg/ha")
    {
      for(var row_no=3;row_no<row.length;row_no++)
      {
        arrState["kerala"][header[row_no]]=(row[row_no]=='NA')?0:parseFloat(row[row_no]);
      }
    }
  }
  if(fss[line_no].search("Rice Yield Andhra Pradesh")!=-1)
  {
    //console.log("hurrey found the Andhra Pradesh state");
    row = fss[line_no].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log(row);
    if (row[2] == "kg/ha")
    {
      for(var row_no=3;row_no<row.length;row_no++)
      {
        arrState["andhra Pradesh"][header[row_no]]=(row[row_no]=='NA')?0:parseFloat(row[row_no]);
      }
    }
  }
}

console.log(arrState);

for(var m=1993; m<2015 ;m++)
{
  var temp_obj={
                "state":{},
                "year":{}
                };
    for(var j=0;j<4;j++)
    {
        if(j==0)
        {
          temp_obj["year"]=parseInt(m);
          temp_obj["state"]["karnataka"]=arrState["karnataka"][m];
        }
        if(j==1)
        {
          temp_obj["year"]=parseInt(m);
          temp_obj["state"]["kerala"]=arrState["kerala"][m];
        }
        if(j==2)
        {
          temp_obj["year"]=parseInt(m);
          temp_obj["state"]["andhra Pradesh"]=arrState["andhra Pradesh"][m];
        }
        if(j==3)
        {
          temp_obj["year"]=parseInt(m);
          temp_obj["state"]["tamil Nadu"]=arrState["tamil Nadu"][m];
        }
    }
    if((temp_obj["state"]["karnataka"]!=0)||(temp_obj["state"]["kerala"]!=0)||(temp_obj["state"]["andhra Pradesh"]!=0)||(temp_obj["state"]["tamil Nadu"]!=0))
    json.push(temp_obj);
}

//console.log(json);

  fs.writeFile('my_json.json', JSON.stringify(json) , function (err)
  {
  if (err) return console.log(err);
});//write funciton closes here

});
