var app = {

    findByName: function() {
        var self = this
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
            if (self.iscroll) {
                console.log('Refresh iScroll');
                self.iscroll.refresh();
            } else {
                console.log('New iScroll');
                self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
            }
        });
    },

    initialize: function() {
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        var self = this;
        this.store = new MemoryStore(function(){
        self.showAlert("MemoryStore initiated!", "Info")
        });
        this.renderHomeView();
    },

    showAlert: function(message, title){
        if(navigator.notification){
            navigator.notification.alert(message, null, title, "OK")
        }else{
            alert(title? (title +" : "+message ):message)
        }
    },

    renderHomeView: function(){

        $("body").html(this.homeTpl())
        $(".search-key").on("keyup", $.proxy(this.findByName, this))
    }

};

app.initialize();