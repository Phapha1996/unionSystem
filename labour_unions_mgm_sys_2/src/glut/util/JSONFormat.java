package glut.util;

import java.util.Arrays;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.PropertyFilter;
import com.alibaba.fastjson.serializer.SerializeWriter;

public class JSONFormat {
	// 数据库数据格式{"birthday":-444643200000,"dpmBrief":"理学院","dpmDetail":"理学院.物理教研室","duty":"","employType":"编内聘用","firstEmpJob":"副教授","firstEmpJobType":"专技五级","graduateSch":"广西大学","idCard":"11111165","joinCondition":"编内聘用","level":"副处级","major":"物理学","name":"55","nationality":"汉","native_":"广西百色","number":"1977008","politics":"中共党员","sex":"男","subject":"理学","title":"副教授","titleLevel":"高","topDegree":"硕士","topEducation":"研究生"}
	// 返回给GridPanel的数据格式： {totalProperty:2,root:[{},{},{}.......]}
	public static String covert2ExtjsGrid(List data) {

		String raw = JSON.toJSONString(data);
		int total = data.size();

		String format = "{totalProperty:" + total + ",root:" + raw + "}";

		return format;
	}

	// added by yattie, 包含过滤属性
	public static String covert2ExtjsGrid(List data, final String[] filtered) {

		// 忽略集合类对象（外键引用对象）
		PropertyFilter filter = new PropertyFilter() {
			public boolean apply(Object source, String name, Object value) {
				if (contains(filtered, name)) {
					return false;
				}
				return true;
			}
		};
		SerializeWriter sw = new SerializeWriter();
		JSONSerializer serializer = new JSONSerializer(sw);
		serializer.getPropertyFilters().add(filter);
		serializer.write(data);
		String raw = serializer.toString();
		
		int total = data.size();

		String format = "{totalProperty:" + total + ",root:" + raw + "}";

		return format;
	}
	
	public static boolean contains(String[] stringArray, String source) {
		  // 转换为list
		  List<String> tempList = Arrays.asList(stringArray);
		  
		  // 利用list的包含方法,进行判断
		  if(tempList.contains(source))
		  {
		   return true;
		  } else {
		   return false;
		  }
		 }
	public static String tojson(List data) {

		String raw = JSON.toJSONString(data);
		int total = data.size();

		String format = "{totalProperty:" + total + ",root:" + raw + "}";

		return format;
	}

}
