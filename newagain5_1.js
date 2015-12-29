fs = require('fs');
var arr=[];
var index1;
var index;


var container=[];
var container1=[];
var g;
var json=[];
fs.readFile('inp.csv', 'utf8', function (err,data)
{
  if (err)
  {
    return console.log(err);
  }
        var content=[];
        var lines = data.split('\r\n');

        var header=lines[0];
        //console.log(header);
        var ele=header.split(',');
        index=ele.indexOf(" 3-1993");
        index1=ele.indexOf("Particulars");
        for(var t=index;t<ele.length;t++)
        {
          var temp={};
          temp["year"]=ele[t].substring(3,ele[t].length);
          container.push(temp);
        }
        //console.log(container);






         var len = (lines[0].split(',')).length;


             for(var j=1;j<lines.length;j++)
             {
            content=lines[j].split(',');
            for(var k=0;k<content.length;k++)
             {
          if(content[k].indexOf("Annual")>-1)
            {
              content[k]=content[k]+content[k+1];

            for(var l=k+1;l<((content.length)-1);l++)
               {
              content[l]=content[l+1]
               }
              }
            }


               var Year={};
              if(content[index1].indexOf("Rice Yield Karnataka")!=-1)
              {

                 for(g=index;g<(len);g++)
                {
                 if(content[g]=="NA")
                    {

                       continue;
                    }
                     else
                     {

                       container[g-index]["Karnataka"]=parseFloat(content[g]);


                     }
                 }

                }



              if(content[index1].indexOf("Rice Yield Kerala")>-1)
              {

                for(g=index;g<(len);g++)
                {
                  if(content[g]=="NA")
                  {
                     continue;
                 }
                     else
                     {
                      container[g-index]["Kerla"]=parseFloat(content[g]);
                     }

                }

           }

           if(content[index1].indexOf("Rice Yield Andhra Pradesh")>-1)
            {

              for(g=index;g<(len);g++)
              {
                if(content[g]=="NA")
                    {

                    continue;
                   }
                   else{
                     container[g-index]["AndhraPradesh"]=parseFloat(content[g]);
                   }

              }


          }


          if(content[index1].indexOf("Rice Yield Tamil Nadu")>-1)
           {

             for(g=index;g<(len);g++)
             {
                    if(content[g]=="NA")
                        {

                        continue;
                       }
                       else
                       {
                         container[g-index]["TamilNadu"]=parseFloat(content[g]);
                       }
                 }

            }

               }

//         // for(i=index;i<len;i++)
//         // {
//         //   console.log(Year.Karnataka);
//         // }
//                    for(i=14;i<len-1;i++)
//                        {
//                          var obj1={};
//                           obj1["Year"]=ele[i];
//                          obj1["Values"]=Year[ele[i]];
//                          json.push(obj1);
//                       }


           console.log(container);
        // json.push(Year);
         fs.writeFile("File4_1.json", JSON.stringify(container) , function(err) {
          if(err)
          {
              return console.log(err);
           }
            });
    //  console.log(main);
        });
