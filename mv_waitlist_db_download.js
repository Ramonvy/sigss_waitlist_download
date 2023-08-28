//Script pra download da lista em 'Lista de Espera'

function export2txt(data) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 0)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "page_1.txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//Retorna a 'página' de cadastros especificada
function getPage(page){
    //                                      /sigss/listaEspera/listar?filters%5B0%5D=isFiltrarData%3Afalse&filters%5B1%5D=dataInicial%3A&filters%5B2%5D=dataFinal%3A&filters%5B3%5D=limoPK%3A&filters%5B4%5D=liesTipo%3A&filters%5B5%5D=liesSituacao%3ATOD&filters%5B6%5D=isenPK%3A&filters%5B7%5D=apcnId%3A&filters%5B8%5D=prsaPK%3A&filters%5B9%5D=prciPK%3A&filters%5B10%5D=prsaSolicitantePK%3A&filters%5B11%5D=benePK%3A&filters%5B12%5D=deprPK%3A&filters%5B13%5D=clienteId%3A&filters%5B14%5D=prefeituraPK%3A&filters%5B15%5D=isFiltrarDatas%3Afalse&filters%5B16%5D=dataI%3A&filters%5B27%5D=dataF%3A&filters%5B28%5D=tufgId%3A&filters%5B29%5D=tusgId%3A&filters%5B30%5D=isenIsBloqueado%3A&_search=false&nd=1692375508744&rows=15&page=1&sidx=lies.liesGravidade&sord=desc
    var theUrl = window.location.origin + '/sigss/listaEspera/listar?filters%5B0%5D=isFiltrarData%3Afalse&filters%5B1%5D=dataInicial%3A&filters%5B2%5D=dataFinal%3A&filters%5B3%5D=limoPK%3A&filters%5B4%5D=liesTipo%3A&filters%5B5%5D=liesSituacao%3ATOD&filters%5B6%5D=isenPK%3A&filters%5B7%5D=apcnId%3A&filters%5B8%5D=prsaPK%3A&filters%5B9%5D=prciPK%3A&filters%5B10%5D=prsaSolicitantePK%3A&filters%5B11%5D=benePK%3A&filters%5B12%5D=deprPK%3A&filters%5B13%5D=clienteId%3A&filters%5B14%5D=prefeituraPK%3A&filters%5B15%5D=isFiltrarDatas%3Afalse&filters%5B16%5D=dataI%3A&filters%5B27%5D=dataF%3A&filters%5B28%5D=tufgId%3A&filters%5B29%5D=tusgId%3A&filters%5B30%5D=isenIsBloqueado%3A&_search=false&nd=1692375508744&rows=500&page=' + page + '&sidx=lies.liesGravidade&sord=desc';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    data = JSON.parse(xmlHttp.responseText);
    return data;
}

//Baixa todos os cadastros atualmente disponiveis na base
function getFullyDb(){
    let total = -1;
    let drop = {"page":1,"total":1,"records":0,"rows":[]};

    for(let i = 1; i <= total || total == -1; i++){
        var page = getPage(i);
        console.log('Page ' + i + '/' + total + ' downloaded...');

        if(total == -1){
            total = page['total'];
        }

        drop['rows'] = drop['rows'].concat(page['rows']);
    }

    drop['records'] = drop['rows'].length;

    export2txt(drop);
}

getFullyDb();