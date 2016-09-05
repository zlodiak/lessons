<?php
class Kalinin_Pics_IndexController extends Mage_Core_Controller_Front_Action
{
     public function indexAction()
     {
        Mage::log('Kalinin_Pics_IndexController');
        $this->loadLayout()
            ->renderLayout();
     }

/*     public function viewAction()
     {
         $quote_id = (int)$this->getRequest()->getParam('id');
         if (!$quote_id) {
             $this->_forward('noRoute');
         }
         $this->loadLayout();
         $this->getLayout()
            ->getBlock('quote.item')
            ->setQuoteId($quote_id);
        try {
            $this->renderLayout();
        } catch (Exception $e) {
            Mage::logException($e);
            $this->_forward('noRoute');
        }
     }*/
}
