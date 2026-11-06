resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.partition_key
  range_key      = var.sort_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.gsi
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = lookup(global_secondary_index.value, "range_key", null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = var.read_capacity
      write_capacity  = var.write_capacity
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.lsi
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = "KEYS_ONLY"
    }
  }

  point_in_time_recovery {
    enabled = var.point_in_time_recovery
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  ttl {
    attribute_name = var.ttl_attribute
    enabled        = var.ttl_enabled
  }

  tags = merge(
    var.common_tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "Purpose"     = "orders-crud"
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_revision" "main" {
  count = var.enable_streams ? 1 : 0

  table_name = aws_dynamodb_table.orders.name

  stream_specification {
    stream_enabled   = true
    stream_view_type = var.stream_view_type
  }
}

resource "aws_appautoscaling_target" "orders_read_target" {
  count = var.enable_autoscaling ? 1 : 0

  max_capacity       = var.autoscaling_max_read_capacity
  min_capacity       = var.autoscaling_min_read_capacity
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "orders_read_policy" {
  count = var.enable_autoscaling ? 1 : 0

  name                   = "orders-read-scaling-policy"
  policy_type            = "TargetTrackingScaling"
  resource_id            = "table/${var.table_name}"
  scalable_dimension     = "dynamodb:table:ReadCapacityUnits"
  service_namespace      = "dynamodb"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value = var.autoscaling_target_read_utilization
  }
}

resource "aws_appautoscaling_target" "orders_write_target" {
  count = var.enable_autoscaling ? 1 : 0

  max_capacity       = var.autoscaling_max_write_capacity
  min_capacity       = var.autoscaling_min_write_capacity
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "orders_write_policy" {
  count = var.enable_autoscaling ? 1 : 0

  name                   = "orders-write-scaling-policy"
  policy_type            = "TargetTrackingScaling"
  resource_id            = "table/${var.table_name}"
  scalable_dimension     = "dynamodb:table:WriteCapacityUnits"
  service_namespace      = "dynamodb"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value = var.autoscaling_target_write_utilization
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_read_throttle" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-read-throttle-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ReadThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "Este alarm detecta cuando hay eventos de throttling en lecturas de la tabla de ordenes"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_write_throttle" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-write-throttle-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "WriteThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "0"
  alarm_description   = "Este alarm detecta cuando hay eventos de throttling en escrituras de la tabla de ordenes"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_consumed_read_capacity" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-consumed-read-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedReadCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Maximum"
  threshold           = var.alarm_read_capacity_threshold
  alarm_description   = "Alarm que se dispara cuando el consumo de capacidad de lectura supera el umbral configurado"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "orders_consumed_write_capacity" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.table_name}-consumed-write-capacity-alarm"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ConsumedWriteCapacityUnits"
  namespace           = "AWS/DynamoDB"
  period              = "300"
  statistic           = "Maximum"
  threshold           = var.alarm_write_capacity_threshold
  alarm_description   = "Alarm que se dispara cuando el consumo de capacidad de escritura supera el umbral configurado"
  alarm_actions       = var.alarm_actions
  ok_actions          = var.alarm_actions

  dimensions = {
    TableName = var.table_name
  }
}