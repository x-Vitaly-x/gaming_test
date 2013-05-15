$(document).on("click", ".state_trigger", function (event) {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    $(".selected-trigger").removeClass("selected-trigger");
    $(event.currentTarget).addClass("selected-trigger");
    data = $(event.currentTarget).attr("href").split("/").filter(Boolean);
    State.push({type:data[0], id:data[1], method:data[2]}, $(event.currentTarget).attr("title"), $(event.currentTarget).attr("href"));
});

// handle state change and state transition
function handle_state(state) {

    // so that zombie events do not occur
    Main.current_view.stopListening();
    Main.current_view.undelegateEvents();

    console.log(state);
    switch (state.type) {
        case "scores":
            switch (state.method) {
                case undefined:
                    // all scores
                    new ScoreView({
                        collection:new ScoreList(),
                        el:$("#container")
                    });
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}
;
State = {
    push:function (arg1, arg2, arg3) {
        window.history.pushState(arg1, arg2, arg3);
        //console.log(window.history.state);
        handle_state(window.history.state);
    },
    replace:function (arg1, arg2, arg3) {
        window.history.replaceState(arg1, arg2, arg3);
        handle_state(window.history.state);
    }
};