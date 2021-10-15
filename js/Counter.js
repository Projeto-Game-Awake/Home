GameAwakeUtils.Counter = {
    show: function(
        scene=null,
        x=400,
        y=300,
        message= "",
        type=0,
        times=3,
        callback=function() {},
        style={
            fontSize: 96,
            fontFamily: 'Arial',
            align: "center",
            color:'#d75413',
            wordWrap: { width: 800, useAdvancedWrap: true }
        }) {
        if(scene == null) {
            return;
        }
        this.times = times;

        let back = scene.add.rectangle(0,0,800,600,0x000000);
        back.alpha = 0.6;
        back.setOrigin(0);
    
        const text = scene.add.text(x, y, message, style);
        text.setOrigin(0.5);

        this.number = scene.add.text(400, 300, "", style);
        this.number.setOrigin(0.5);
    
        text.setStroke('#000000', 4);
        //  Apply the gradient fill.
        let gradient = text.context.createLinearGradient(0, 0, 0, text.height);
    
        if(type==0) {
            gradient = this.createGradientSucess(gradient);
        } else {
            gradient = this.createGradientFail(gradient);
        }
        text.setFill(gradient);
    
        let timer = scene.time.addEvent({
            delay: 1000,
            callback: () => { this.doCountDown() },
            repeat: times - 1
        });
        this.doCountDown();
        scene.time.delayedCall(times * 1000, function() {
            back.destroy();
            text.destroy();
            this.number.destroy();
            callback();
        }, [], this);
    },
    doCountDown: function() {
        this.number.setText(this.times);
        this.times--;
    },
    createGradientSucess: function(gradient) {
        gradient.addColorStop(0, '#111111');
        gradient.addColorStop(.5, '#00ff00');
        gradient.addColorStop(.5, '#11aa11');
        gradient.addColorStop(1, '#111111');
        return gradient;
    },
    createGradientFail: function(gradient) {
        gradient.addColorStop(0, '#111111');
        gradient.addColorStop(.5, '#ffffff');
        gradient.addColorStop(.5, '#aaaaaa');
        gradient.addColorStop(1, '#111111');
        return gradient;
    }
}
