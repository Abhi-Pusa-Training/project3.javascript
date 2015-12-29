var fs=require('fs');
fs.readFile('inp.csv','utf8',function(err,data){                          //reading a file using fileread system
  if (err) {
      return console.log(err);
    }

var lines=data.split('\r\n');
var len_lines=lines.length;
var header = [];
var json=[];
var aggr_prod=[];

for(var line_count=0;line_count<lines.length;line_count++)                  //traversing each and every line
{
  if(line_count==0)                                                      //checking the 1st line and capturing the header section in an array
  {
    header=lines[line_count].split(',');
    var header_len=header.length;
  }//end of a if condition for finding the header

  var tmp={};

  if(lines[line_count].search("Commercial") != -1)                        //if found the oilseed details
  {
    var words = lines[line_count].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //tmp["crop_type"]=(words[0].substring(34,words[0].length));
    //tmp["2013"]=(words[23]=='NA')?0:parseFloat(words[23]);
    console.log(words);
    for(var word_num=3;word_num<words.length;word_num++)
    {
      //console.log(words[word_num]);
      aggr_prod[word_num-3]=aggr_prod[word_num-3]+(words[word_num]=="NA")?0:parseFloat(words[word_num]);
    }

    //console.log(tmp);
    //json.push(tmp);
  } //end of if condition for line containing Oilseed


}   //end of the loop for counting the nymber of lines


  console.log(aggr_prod);


  for(var r=0;r<aggr_prod.length;r++)
  {
    var obj={};
    obj["year"]=1993+parseInt(r);
    obj["value"]=isNaN(aggr_prod[r])?0:aggr_prod[r];
    if(obj["value"])
    json.push(obj);
  }

  console.log(json);

// function compare(a,b) {
//   if (a["2013"] > b["2013"])
//     return -1;
//   if (a["2013"] < b["2013"])
//     return 1;
//   return 0;
// }
//
// json.sort(compare);
//
fs.writeFile('test3.json', JSON.stringify(json) , function (err)
{
if (err) return console.log(err);
});//write funciton closes here)

});
