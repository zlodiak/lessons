<?php
class Kalinin_Pics_Content extends Mage_Core_Block_Template
{
    protected function _construct()
    {
        Mage::log('Kalinin_Pics_Content');
        $this->setTemplate('kalinin/pics/view.phtml');
    }
    
}
