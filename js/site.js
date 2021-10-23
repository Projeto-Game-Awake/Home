let jogos = null;
let home = null;

$.get("json/jogos.json", function(data, status){
    jogos = data.jogos;
    let ul = $("#accordion-jogo");
    $.each( jogos , function ( index, value ){
    let jogo = data.jogos[index];
    let a = '<a href="'+jogo.url+'" class="list-group-item list-group-item-action flex-column align-items-start">'+
    '  <div class="d-flex w-50 justify-content-between">'+
    '    <small>'+jogo.descricao+'</small>'+
    '    <img src="imagens/'+convertNome(jogo.nome)+'.png" />'+            
    '  </div>'+
    '</a>';
    ul.append(montarAccordionItem("jogo",jogo,a));
    });


$.get("json/home.json", function(data, status){
    home = data;
    mostraAulas("tema");
    mostraAulas("alianca");

    function mostraAulas( tipo ){
    let accordion = $("#accordion-"+tipo);
        $.each( home[tipo].aulas , function ( index, value ){
            let aula = home[tipo].aulas[index];
            let ul = '<ul>';
            if(aula.jogos.length==0) {
                ul += '<li>Não existe jogo associados a esse tema!</li>'
            } else {
                for(let i=0;i<aula.jogos.length;i++) {
                    let jogoAula = aula.jogos[i];
                    let jogo = jogos[jogoAula.id];
                    ul += '<li><a href="'+jogo.url+"?"+jogoAula.parm+'">'+jogo.nome+"</a></li>"
                }
            }
            ul += '</ul>';
            accordion.append(montarAccordionItem(tipo, aula,ul));
        }); 
    }
});
});

function convertNome(nome) {
    return nome.normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll(" ","-")
}

function montarAccordionItem( tipo, aula, html ){
    let nome = convertNome(aula.nome);
    let div = '<div class="accordion-item">' +
    ' <h2 class="accordion-header" id="heading'+nome+'">'+
    '   <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+nome+'" aria-expanded="true" aria-controls="collapse'+nome+'">'+
    '     '+aula.nome+
    '   </button>'+
    ' </h2>'+
    ' <div id="collapse'+nome+'" class="accordion-collapse collapse" aria-labelledby="heading'+nome+'" data-bs-parent="#accordion-'+tipo+'">'+
    '   <div class="accordion-body">'+
    html+
    '   </div>'+
    ' </div>'+
    '</div>';
    return div;
}