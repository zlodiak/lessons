<?php
/**
 * @file
 * Theme implementation to display day cell.
 *
 * Variables:
 * - $number: Day number from beginning of month
 * - $date: Day number from beginning of month
 * - $delta: Day number from beginning of week
 * - $class: Default cell class
 * - $count: Node counter
 * - $using_tooltip: Using tooltips (boolean)
 * - $is_empty: Blank cell (boolean)
 */
?>

<?php if ($count > 0) : ?>
<a class="tooltip" title="<?php
  print russian_beauty_calendar_plural($count);
?>" href="<?php
  global $base_path;
  print $base_path;
?>calendar/<?php
  print $date;
?>"<?php 
  print ($using_tooltip ? ' rel="' . $date . '"' : '');
?>>
<?php endif; ?>
  <div class="<?php print $class . ($is_empty ? ' blank' : ''); ?>">
    <div class="rbc_value"><?php print $number; ?></div>
  </div>
<?php if ($count > 0) : ?>
</a>
<?php endif; ?>
