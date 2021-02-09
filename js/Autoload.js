var ListaKolegija=[];
var ChosenKolegij=[];
//NastavniPlan
$(function () {
    
    var url="http://www.fulek.com/VUA/SUPIT/GetNastavniPlan";
    var xhr=new XMLHttpRequest();
    xhr.open('get',url);
    xhr.onreadystatechange=()=>
    {
        if (
            xhr.readyState===XMLHttpRequest.DONE &&
            xhr.status===200
        ) {
            var myArr=JSON.parse(xhr.responseText);
            //console.log(myArr);
            GetNastavniPlan(myArr);
        }
    };
    xhr.send();

    $('#NazivKolegija').autocomplete({
    delay: 0,
    mustMatch: false,
    source: ListaKolegija,
    select: function (event, ui) {
        $('#NazivKolegija').val(ui.item.label);
        GetKolegij(ui.item.value);
        return false;
        }
    });

    $('#dijaloskiOkvir').dialog({
        autoOpen: false,
        modal: true,
        colapsOnEscape: true,
        buttons: {
          'Ok': function () {
            $('#dijaloskiOkvir').dialog('close');
          }
        }
      });

});

    function GetNastavniPlan(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {       
        out += '<div>' + arr[i].label + " "+
        arr[i].value + '</div><br>';
        var input={
            "label":arr[i].label,
            "value":arr[i].value,
            "acronym": GetAcronym(arr[i].label)
        }
        //console.log(input);
        ListaKolegija.push(input);
    }
    }

    
    function GetKolegij(KolegijID) {
        var page="http://www.fulek.com/VUA/supit/GetKolegij/"+KolegijID;

        var XMLkolegij=new XMLHttpRequest();
        XMLkolegij.open('GET',page);
        XMLkolegij.onreadystatechange=()=>
        {
        if (
            XMLkolegij.readyState===XMLHttpRequest.DONE &&
            XMLkolegij.status===200
        ) {
            var myArr=JSON.parse(XMLkolegij.responseText);
            //console.log(myArr);
            AddKolegij(myArr)
        }
        };
        XMLkolegij.send();

    }

    //{"id":6,"kolegij":"Računalna podrška uredskom poslovanju","ects":4,"sati":45,"predavanja":1,"vjezbe":2,"tip":"Obavezni","semestar":1}
    function AddKolegij(arr) {

        if (ChosenKolegij.includes(arr.kolegij)) {
            //alert("Kolegij: "+ arr.kolegij + " is already in table");
            $('#dijaloskiOkvir').html("Kolegij: "+ '<b>' + arr.kolegij + '</b>' + " is already in table");
            $('#dijaloskiOkvir').dialog('open');
            $('#NazivKolegija').val("");
            return;
        }

        var table=document.getElementById('kolegiji');
        var row=table.insertRow(1);
        row.id="kolegij";
        row.insertCell(0).innerHTML="<button onclick='RemoveKolegij(this)' class='RemoveKolegij'>Obriši</button>";
        row.insertCell(0).innerHTML=arr.tip;
        row.insertCell(0).innerHTML=arr.vjezbe;
        row.insertCell(0).innerHTML=arr.predavanja;
        row.insertCell(0).innerHTML=arr.sati;
        row.insertCell(0).innerHTML=arr.ects;
        row.insertCell(0).innerHTML=arr.kolegij;

        ChosenKolegij.push(arr.kolegij);
        RepeatEach();            
    }

    function RemoveKolegij(row) {
        var p=row.parentNode.parentNode;
        ChosenKolegij=ChosenKolegij.filter(item => item !== p.firstChild.innerHTML) //remove Kolegij from array
        p.parentNode.removeChild(p); //remove row from table
        RepeatEach();
    }

    function CheckTableSize() {
        if ($('#kolegiji tr').length<3) {
            $('#kolegiji').css({display: "none"});
        }
        else{
            $('#kolegiji').css({display: "block"});
        }

        if ($('#kolegiji tr').length>7) {
            $('#kolegiji').css({overflowY: "scroll",overflowX: "none"}); 
        }
        else{$('#kolegiji').css({overflowY: "hidden",overflowX: "hidden"}); }
    }

    function RepeatEach() {
        CheckTableSize();
        Calculate(1,"ukupnoECTS");
        Calculate(2,"ukupnoSATI");
    }

    function GetAcronym(text) {
        var acronym="";
        var array=text.split(" ");
        array.forEach(element => {
            acronym+=element[0].toUpperCase();
        });
        return acronym;
    }

    function Calculate(index_cell,IdName) {

        var s=0;

        for (let i = 1; i < $('#kolegiji tr').length-1; i++) {
            
            s=s+parseInt(
            document.getElementById("kolegiji").rows[i].cells[index_cell].innerHTML);
        }

        document.getElementById(IdName).innerHTML=s;
    }


    