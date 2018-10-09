odoo.define('sales_dashboard_graph.GraphBoardPage', function(require){
    "use strict";

    var core = require('web.core');
    var Widget = require('web.Widget');

    var GraphInvoicesWidgetManager = Widget.extend({
       template: 'InvoiceChart',

        init: function(parent) {
            this._super(parent);
        },
     
        
     
        start: function() {
            this._super()
            this._drawGraphs();

        },

      
      _get_data : function(){
            var self=this;
            var graph_data = []
            graph_data.push(['State', 'Amount'])
            self._rpc({
                model: 'gcapi.dashboard',
                method: 'get_invoices_amount',
                args: [],
                context:self.getSession().user_context,
            }).then(function (result) {
                _.each(result, function (pipline) {
                   
                    var pipe = [];
                    pipe.push(pipline[0]);
                    pipe.push(pipline[1]);
                    graph_data.push(pipe);
                });
                });

            return graph_data
            
        },
 
        _drawGraphs: function () {
              var self = this;
              google.charts.load('current', {'packages':['bar']});
              google.charts.setOnLoadCallback(DrawGraph);
              var data = self._get_data()
              function DrawGraph() {
                var data_table= []
                setTimeout(function(){data = google.visualization.arrayToDataTable(data);},3000);
               
                var options = {
                  chart: {
                    title: 'Factures',
                    subtitle: 'Facture PipeLine (Montant)',
                  },
                  width: 600,
                   height: 400,
                   bar: {groupWidth: "95%"},
                  bars: 'horizontal' // Required for Material Bar Charts.
                };

                var chart = new google.charts.Bar(document.getElementById('invoice_bar_chart'));
                setTimeout(function(){ chart.draw(data_table, google.charts.Bar.convertOptions(options));},4000);
               
              }
}    
});
        core.action_registry.add('google_chart_api.invoice_barchart', GraphInvoicesWidgetManager);

});

