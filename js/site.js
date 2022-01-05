let jogos = null;
let home = null;

$.get("json/jogos.json", function(data, status){
    jogos = data.jogos;
    jogosOrdenados = GameAwakeUtils.clone(jogos).sort(comparar);
    let ul = $("#accordion-jogo");
    $.each( jogosOrdenados , function ( index, value ){
        let jogo = jogosOrdenados[index];
        let parenteses = jogo.nome.indexOf("(");
        let simpleName = jogo.nome.substring(0,parenteses).trim();
        let w1 = "";
        let w2 = "";
        if(screen.availWidth > 800) {
            w1 = "style=\"width:200px;\""
            w2 = "style=\"width:600px;\""
        }
        let a = '<a href="'+jogo.url+'" class="list-group-item list-group-item-action flex-column align-items-start">'+
    '  <div class="d-flex w-20">'+
    '    <small>'+jogo.descricao+'</small>'+
    '  </div>'+
    '  <div class="d-flex w-30">'+
    '    <img src="imagens/'+convertNome(simpleName)+'.png" '+w2+' />'+            
    '  </div>'
    '</a>';
    ul.append(montarAccordionItem("jogo",jogo,simpleName,a));
    });


$.get("json/home.json", function(data, status){
    home = data;
    mostraAulas("tema");
    mostraAulas("alianca");

    function mostraAulas( tipo ){
        let accordion = $("#accordion-"+tipo);
        let aulas = home[tipo].aulas;
        if(home[tipo].sort) {
            aulas = aulas.sort(comparar);
        }
        $.each( aulas , function ( index, value ){
            let aula = aulas[index];
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
            accordion.append(montarAccordionItem(tipo, aula,aula.nome,ul));
        }); 
    }
});
});

function comparar(a,b) {
    return a.nome.localeCompare(b.nome);
}

function montarAccordionItem( tipo, aula, nome, html ){
    nome = convertNome(nome);
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