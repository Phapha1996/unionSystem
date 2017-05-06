package glut.proposal.action;

import glut.db.auto.Proposal;
import glut.proposal.service.UserService_Stat;

import java.awt.Color;
import java.awt.Font;
import java.awt.SystemColor;
import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryLabelPositions;
import org.jfree.chart.axis.NumberAxis3D;
import org.jfree.chart.labels.ItemLabelAnchor;
import org.jfree.chart.labels.ItemLabelPosition;
import org.jfree.chart.labels.StandardCategoryItemLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.chart.renderer.category.BarRenderer3D;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.ui.TextAnchor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

/**
 * 
 * @author leo 20151220
 * 
 */
@Controller("userAction_pro_stat")
@Scope("prototype")
public class UserAction_Stat extends UserAction {
	private Proposal proposal;
	private UserService_Stat uss;
	private CategoryDataset dataset;
	private String fields;
	private JFreeChart chart;
	private String count;

	// 返回值为jfreechart导出的jpg图片的url
	public String getStatictis() throws Exception {
		return uss.getStatictis();
	}

	public void createBarChart() {
		// 1.获取数据
		dataset = getDataSet();
		// 2.构造chart
		createBarChart3D();

		// 3. 处理chart中文显示问题
		processChart(chart);

		// 4. chart输出图片,获取图片路径
		writeChartAsImage(chart);

	}

	/**
	 * 获取数据库数据
	 * */
	public CategoryDataset getDataSet() {
		DefaultCategoryDataset dataset = new DefaultCategoryDataset();
		List<Object[]> list1 = null;
		List list2 = null;
		list1 = uss.loadDataFromDB(fields);
		list2 = uss.getCountNum();
		Number value = 0;
		String rowKeys = null;
		String columnKeys = null;
		if ("submitter_dpm".equals(fields)) {
			rowKeys = "部门提案数";
		} else if ("category".equals(fields)) {
			rowKeys = "分类提案数";
		}
		for (Object[] object : list1) {
			value = (Number) object[1];
			columnKeys = (String) object[0];
			dataset.addValue(value, rowKeys, columnKeys);
		}
		for (Object object : list2) {
			count = object.toString();
		}
		return dataset;
	}

	/**
	 * 创建图例
	 * */
	public void createBarChart3D() {
		String xtitle = null;
		if ("submitter_dpm".equals(fields)) {
			xtitle = "部门";
		} else if ("category".equals(fields)) {
			xtitle = "类别";
		}
		chart = ChartFactory.createBarChart3D("提案总数统计"
				+ "                          总数：" + count, // 图表标题
				xtitle, // 目录轴的显示标签
				"数量", // 数值轴的显示标签
				dataset, // 数据集
				PlotOrientation.VERTICAL, // 图表方向：水平、垂直
				true, // 是否显示图例(对于简单的柱状图必须是false)
				true, // 是否生成工具
				true // 是否生成URL链接
				);
	}

	/**
	 * 解决图表汉字显示问题
	 * 
	 * @param chart
	 */
	public void processChart(JFreeChart chart) {
		chart.setBackgroundPaint(SystemColor.controlHighlight);

		// 设置图标标题字体
		chart.getTitle().setFont(new Font("宋体", Font.PLAIN, 20));

		CategoryPlot plot = chart.getCategoryPlot();
		// 设置横轴标题字体
		plot.getDomainAxis().setLabelFont(new Font("宋体", Font.PLAIN, 14));
		plot.getDomainAxis().setCategoryLabelPositions(
				CategoryLabelPositions.UP_45);

		// 设置横轴标记的字体
		plot.getDomainAxis().setTickLabelFont(new Font("宋体", Font.PLAIN, 12));
		// 设置横轴标记字体颜色
		plot.getDomainAxis().setTickLabelPaint(Color.RED);

		// 设置纵轴标题字体
		plot.getRangeAxis().setLabelFont(new Font("宋体", Font.PLAIN, 14));

		// 设置纵轴标记字体
		NumberAxis3D numberAxis3D = (NumberAxis3D) plot.getRangeAxis();
		numberAxis3D
				.setStandardTickUnits(NumberAxis3D.createIntegerTickUnits());
		numberAxis3D.setTickLabelPaint(Color.RED);

		// 设置图例字体
		BarRenderer3D renderer3D = (BarRenderer3D) plot.getRenderer();
		renderer3D.setBaseLegendTextFont(new Font("宋体", Font.PLAIN, 14));
		renderer3D.setSeriesPaint(0, Color.ORANGE);

		// 设置数值显示在顶部
		renderer3D
				.setBaseItemLabelGenerator(new StandardCategoryItemLabelGenerator());
		renderer3D.setBaseItemLabelsVisible(true);
		renderer3D.setBasePositiveItemLabelPosition(new ItemLabelPosition(
				ItemLabelAnchor.OUTSIDE12, TextAnchor.BASELINE_CENTER));
		renderer3D.setItemLabelAnchorOffset(10D);// 设置柱形图上的文字偏离值

		// 设置柱形图大小比例
		int k = dataset.getColumnCount();
		if (k == 1) {
			plot.getDomainAxis().setLowerMargin(0.26);
			plot.getDomainAxis().setUpperMargin(0.66);
		} else if (k < 6) {
			double margin = (1.0 - k * 0.08) / 3;
			plot.getDomainAxis().setLowerMargin(margin);
			plot.getDomainAxis().setUpperMargin(margin);
			((BarRenderer3D) plot.getRenderer()).setItemMargin(margin);
		} else {
			((BarRenderer3D) plot.getRenderer()).setItemMargin(0.1);
		}
	}

	/**
	 * 输出图片
	 * 
	 * @param chart
	 */
	public void writeChartAsImage(JFreeChart chart) {
		String fileName = null;
		String folderName = "stat";
		String subPath = "/sys_pro/" + folderName;
		String tempJpegPath = ServletActionContext.getServletContext()
				.getRealPath(subPath);
		if ("submitter_dpm".equals(fields)) {
			fileName = "chart_dpm.jpeg";
		} else if ("category".equals(fields)) {
			fileName = "chart_category.jpeg";
		}

		// 在目录下生成图片
		File file = new File(tempJpegPath + "/" + fileName);
		try {
			ChartUtilities.saveChartAsJPEG(file, chart, 800, 450);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	// =====getter、setter====
	public UserService_Stat getUss() {
		return uss;
	}

	@Resource(name = "userServiceImp_stat_pro")
	public void setUss(UserService_Stat uss) {
		this.uss = uss;
	}

	public String getFields() {
		return fields;
	}

	public void setFields(String fields) {
		this.fields = fields;
	}

}
