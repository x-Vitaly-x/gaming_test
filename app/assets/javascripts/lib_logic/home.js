$(document).on("click", "#new_score", function (event) {
    event.preventDefault();
    var username = prompt("Enter username:");
    var score = prompt("Enter score", 0);

    if (score != null) {
        $.ajax({
            type:"post",
            url:"/scores",
            data:{username:username,score:score},
            error:function (request, status, error) {
                alert(request.responseText);
            },
            success:function (msg) {
                console.log(msg);
            }
        });
    }
})
;

var ScoreView = Backbone.View.extend({
    events:{
        "click .scores .more":function (event) {
            event.preventDefault();
            this.offset = this.offset + 10;
            tmp_col = new ScoreList();
            tmp_col.fetch({
                data:{
                    limit:this.limit,
                    offset:this.offset
                },
                success:function (collection, response) {
                    //console.log(response);
                    Main.current_view.collection.add(response);
                    Main.current_view.render_scores();
                }
            });
        }
    },
    initialize:function () {
        this.render();
        this.offset = 0;
        this.limit = 10;
        this.collection = Main.user_score_list;
        Main.current_view = this;
        Main.current_view.collection.fetch({
            data:{
                limit:this.limit,
                offset:this.offset
            },
            success:function (collection) {
                //console.log(msg);
                Main.current_view.render_scores();
            }
        });
    },
    render:function () {
        $("#container").empty();
        $(_.template(
            $("#scores_template").html()
        )()).appendTo("#container");
    },
    render_scores:function () {
        $("#scores").empty();
        $("#sidebar").empty();
        $(_.template($("#scores_list_template").html(), {scores:Main.current_view.collection})).appendTo("#scores");
        $(_.template($("#scores_sidebar_template").html(), {scores:Main.current_view.collection})).appendTo("#sidebar");
    }
});