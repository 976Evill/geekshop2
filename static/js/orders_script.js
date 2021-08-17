window.onload = function () {

    var _quantity, _price , orderitem_num ,delta_quantity,orderitem_quantity,delta_coast;
    var quantity_arr = [];
    var price_arr = [];

    var TOTAL_FORMS = parseInt($('.input[name = orderitems-TOTAL_FORMS]').val());
    var  order_total_quantity = parseInt($('.order_total_quantity').text()) || 0;
    var order_total_coast = parseFloat($('.order_total_coast').test().replase(',','.')) || 0;

    for (var i =0; i < TOTAL_FORMS;i++){
        _quantity = parseInt($('input[name = orderitems-'+ i + '-quantity]').val());
        _price =  parseFloat($('.orderitems-'+ i + '-price').text().replace(',','.'));
        quantity_arr[i] = _quantity;
        if (_price) {
            price_arr[i] = _price;
        }
            else {
                price_arr[i] = 0;
        }
    }
  $('.order_form').on(types:'click', selector:'input[type = number]',function (){
    var target = event.target;
    orderitem_num = parseInt(target.name.replace('orderitems-','').replace('-quantity',''));
    if(price_arr[orderitem_num]){
        orderitem_quantity = parseInt(target.value);
        delta_quantity = orderitem_quantity - quantity_arr[orderitem_num];
        quantity_arr[orderitem_num] = orderitem_quantity
        orderSummaryUpdate(price_arr[orderitem_num],delta_quantity);
    }
    }) ;

    $('.order_form').on(click,'input[type = checkbox', function ()
    {
     var target = event.target;
    orderitem_num = parseInt(target.name.replace('orderitems-','').replace('-quantity',''));

    if(target.checed){
     delta_quantity = -quantity_arr[orderitem_num]
    }else{
        delta_quantity = +quantity_arr[orderitem_num]
    }
    orderSummaryUpdate(price_arr[orderitem_num],delta_quantity);
    }) ;
    function orderSummaryUpdate(orderitem_price,delta_quantity,){
        delta_coast =  orderitem_price * delta_quantity;
        order_total_coast = Number((order_total_coast + delta_coast).toFixed(2));
        order_total_quantity = order_total_quantity + delta_quantity ;
        $('.order_total_quantity').html(order_total_quantity);
        $('.order_total_coast').html(order_total_coast);

    }

    function orderSummaryRecalc({


                                })
    $('formset_row').formset()(
        opts:{
            addText:"добавить товар",
            deleteText:"удалить",
            prefix:"orderitems",
            removed: deleteOrderItems
    });
    function deleteOrderItem(row){
        var target_name = row[0].querySelector('input[type = number]').name;
        orderitem_num = target_name.replace('orderitems-','').replace(''-quantity,'');
        delta_quantity =-quantity_arr[orderitem_num];
        orderSummaryUpdate(price_arr[orderitem_num],delta_quantity);
    }

    $('.order_form ').on(a:'change',b:'select'),function (){
        var target = event.target;
         orderitem_num = parseInt(target.name.replace('orderitems-','').replace('-product',''));
         var orderitem_product_pk = target.option[target.selectedIndex].value;
         $.ajax(url:{
             url:'/order/product/' + orderitem_product_pk +/'price/',
             success:function(data){
                 if(data.price){
                     price_arr[orderitem_num] = parseFloat(data.price);
                     var price_html = "<span>" + data.price.toString().replace('.',',') + "</span>";
                     var curr_tr = $('.order_form table').find(selector:'tr:eq('+ orderitem_num + 1 + ')');
                     curr_tr.find('selector:'td:eq(2)').html(price_html);
                 }

             }

             }

         );
    });
    )

}