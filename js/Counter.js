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

        if(this.text) {
            if(this.isVisible) {
                return;
            }
        } else {
            this.back = scene.add.rectangle(0,0,800,600,0x000000);
            this.text = scene.add.text(x, y, message, style);
            this.number = scene.add.text(400, 300, "", style);
        }

        this.isVisible = true;

        this.times = times;

        this.back.alpha = 0.6;
        this.back.setOrigin(0);

        this.text.alpha = 1
        this.text.setText(message);
        this.text.setOrigin(0.5);
        
        this.number.alpha = 1
        this.number.setOrigin(0.5);
    
        this.text.setStroke('#000000', 4);
        //  Apply the gradient fill.
        let gradient = this.text.context.createLinearGradient(0, 0, 0, this.text.height);
    
        if(type==0) {
            gradient = this.createGradientSucess(gradient);
        } else {
            gradient = this.createGradientFail(gradient);
        }
        this.text.setFill(gradient);
        this.callback = callback;

        if(times == this.times) {
            this.doCountDown(callback);
            this.interval = setInterval(() => { this.doCountDown(callback) }, 1000);
        }
    },
    doCountDown: function(callback) {
        if(this.times == 0) {
            clearInterval(this.interval);
            this.interval = null;
            this.hide();
            callback();
        } else {
            this.number.setText(this.times);
            this.times--;
        }
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
    },
    hide() {
        if(this.number) {
            this.back.alpha = 0;
            this.text.alpha = 0;
            this.number.alpha = 0;
            this.number.setText("");
            this.times = 1;
            this.isVisible = false;
        }
    }
}
