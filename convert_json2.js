var fs=require('fs');
fs.readFile('inp.csv','utf8',function(err,data){                          //reading a file using fileread system
  if (err) {
      return console.log(err);
    }

var lines=data.split('\r\n');
var len_lines=lines.length;
var header = [];
var json=[];

for(var line_count=0;line_count<35;line_count++)                  //traversing each and every line
{
  if(line_count==0)                                                      //checking the 1st line and capturing the header section in an array
  {
    header=lines[line_count].split(',');
    var header_len=header.length;
  }//end of a if condition for finding the header

  var tmp={};

  if(lines[line_count].search("Foodgrains") != -1)                        //if found the oilseed details
  {
    var words = lines[line_count].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    tmp["crop_type"]=(words[0].substring(34,words[0].length));
    tmp["2013"]=(words[23]=='NA')?0:parseFloat(words[23]);

    console.log(tmp);
    json.push(tmp);
  } //end of if condition for line containing Oilseed


}   //end of the loop for counting the nymber of lines

function compare(a,b) {
  if (a["2013"] > b["2013"])
    return -1;
  if (a["2013"] < b["2013"])
    return 1;
  return 0;
}

json.sort(compare);

fs.writeFile('test2.json', JSON.stringify(json) , function (err)
{
if (err) return console.log(err);
});//write funciton closes here)

});
