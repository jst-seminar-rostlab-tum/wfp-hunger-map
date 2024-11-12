import { SidebarAlertType } from '@/domain/entities/sidebar/SidebarAlertType';
import { SidebarMapType } from '@/domain/entities/sidebar/SidebarMapType';
import { AlertType } from '@/domain/enums/AlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';

export class SidebarOperations {
  public static getSidebarMapTypes(): SidebarMapType[] {
    return [
      {
        key: GlobalInsight.FOOD,
        label: 'Food consumption',
        icon: '/menu_fcs.png',
      },
      {
        key: GlobalInsight.NUTRITION,
        label: 'Nutrition',
        icon: '/menu_nutri.png',
      },
      {
        key: GlobalInsight.VEGETATION,
        label: 'Vegetation',
        icon: '/menu_ndvi.png',
      },
      {
        key: GlobalInsight.RAINFALL,
        label: 'Rainfall',
        icon: '/menu_rainfall.png',
      },
      {
        key: GlobalInsight.IPC,
        label: 'IPC/CH',
        icon: '/menu_ipc.png',
      },
    ];
  }

  static sidebarAlertTypes: SidebarAlertType[] = [
    {
      key: AlertType.HUNGER,
      label: 'Hunger Alert',
      icon: '/menu_fcs.png',
    },
    {
      key: AlertType.HAZARDS,
      label: 'Hazards',
      icon: '/menu_hazards.png',
      subalerts: [
        {
          key: AlertType.COVID19,
          label: 'COVID-19',
          icon: '/menu_hazards.png',
        },
        {
          key: AlertType.FLOODS,
          label: 'Floods',
          icon: '/menu_hazards.png',
        },
        {
          key: AlertType.DROUGHTS,
          label: 'Droughts',
          icon: '/menu_hazards.png',
        },
        {
          key: AlertType.EARTHQUAKES,
          label: 'Earthquakes',
          icon: '/menu_hazards.png',
        },
        {
          key: AlertType.CYCLONES,
          label: 'Cyclones',
          icon: '/menu_hazards.png',
        },
      ],
    },
    {
      key: AlertType.CONFLICTS,
      label: 'Conflicts',
      icon: '/menu_conflicts.png',
    },
  ];

  public static getSidebarAlertTypes(): SidebarAlertType[] {
    return SidebarOperations.sidebarAlertTypes;
  }

  public static getSidebarAlertTypeByKey(key: AlertType): SidebarAlertType | undefined {
    return SidebarOperations.sidebarAlertTypes.find((alert) => alert.key === key);
  }

  public static hasSubalerts(item: SidebarAlertType): item is SidebarAlertType & { subalerts: SidebarAlertType[] } {
    return 'subalerts' in item;
  }
}
