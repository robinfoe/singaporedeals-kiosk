<?php
include_once 'inc/config.inc.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>
  
  <link href="css/bootstrap.min.css" rel="stylesheet">
<link href="fonts/css/font-awesome.min.css" rel="stylesheet">
</head>  
<body>
<?php

$file = fopen("file/resort_world.csv","r");
fgets($file);	
//$file = fopen("contacts.csv","r");
$array = array();
$OrderExist=0;
$check=0;

while( ! feof($file) )
{   
    $row = fgetcsv($file);
    $rw_orderID = $row[0];
    
    if(!empty($rw_orderID))
    {
        
        

        $check_orderID = "select `OrderID` from `rw_ticket_record` where OrderID = ".$rw_orderID."";
        $check_orderID_resource = mysql_query($check_orderID);
        $OrderExist = mysql_num_rows($check_orderID_resource);

        if(($OrderExist > 0) && ($check==0)) 
        {
            echo '<div class="row" style="margin-top:50px;">
                <div class="col-md-offset-3 col-md-6 col-sm-6 col-xs-12">
                    <div class="x_content bs-example-popovers">
                        <div role="alert" class="alert alert-success alert-dismissible fade in">
                          <button aria-label="Close" data-dismiss="alert" class="close" type="button"><span aria-hidden="true">×</span>
                          </button>
                          <strong>'.$OrderExist.' Record(s) already exist with this Order ID. First delete existing record</strong>
                        </div>
                    </div>
                </div>
              </div>';
            fclose($file);
            exit();
        }  else {
            $productID =0;
            $bookID=0;
            $orderRef = '';
            $remarks = '';


            $insert_record = "INSERT INTO `rw_ticket_record`(`OrderID`, `OpenDate`, `VisualID`, `PLU`, `Descr`, `Price`, `StartDate`, `EndDate`, `Monday`,
                    `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`, `TicketStatus`, `Product_id`, `OrderRef`, `OrderID_BT`,
                    `Remarks`) 
            VALUES 
                ( ".$row[0].",'".$row[1]."','".$row[2]."','".$row[3]."','".$row[4]."','".$row[5]."',"
                    . "'".$row[6]."','".$row[7]."','".$row[8]."','".$row[9]."',
                '".$row[10]."','".$row[11]."','".$row[12]."','".$row[13]."','".$row[14]."',"
                    . "'".$row[15]."',".$productID.",'".$orderRef."',".$bookID.", '".$remarks."') ";

            $request = mysql_query($insert_record);
            $check++;
            
        }
    } 
}
if($check > 0)
{
    echo '<div class="row" style="margin-top:50px;">
            <div class="col-md-offset-3 col-md-6 col-sm-6 col-xs-12">
                <div class="x_content bs-example-popovers">
                    <div role="alert" class="alert alert-success alert-dismissible fade in">
                      <button aria-label="Close" data-dismiss="alert" class="close" type="button"><span aria-hidden="true">×</span>
                      </button>
                      <strong>'.$check.' records are inserted in to the table successfully</strong>
                    </div>
                </div>
            </div>
          </div>';
    
}

fclose($file);

?>

</body>
</html> 